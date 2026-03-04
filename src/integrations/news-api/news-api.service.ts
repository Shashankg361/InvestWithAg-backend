import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';


export interface NewsResponse {
  success: boolean;
  count: number;
  articles: any[];
}

@Injectable()
export class NewsApiService {
  private RAPID_API_KEY = process.env.RAPIDAPI_KEY;
  private MARKETAUX_KEY = process.env.MARKET_AUX_KEY;
  private FINNHUB_KEY = process.env.FINNHUB_KEY;

  /* ================================
     PUBLIC METHOD (ONLY ONE YOU CALL)
  ================================= */
  async getAllStockNews(symbols: string): Promise<NewsResponse>{
    const formattedSymbol = this.formatSymbol(symbols);

    const [yahoo, marketaux, finnhub] = await Promise.all([
      this.getYahooNews(formattedSymbol),
      this.getMarketauxNews(formattedSymbol),
      this.getFinnhubNews(formattedSymbol),
    ]);

    const combined = [...yahoo, ...marketaux, ...finnhub];

    const filtered = combined.filter(article =>
      this.isRelevant(article, symbols)
    );

    // 🚨 Deduplication logic will be added later here
     const deduped = this.dedupeNews(filtered)
     .sort((a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime()
    )
    .slice(0, 15);

    return {
      success: true,
      count: deduped.length,
      articles: deduped,
    };
  } 

  /* ================================ 
     YAHOO FINANCE (RapidAPI)
  ================================= */
  private async getYahooNews(symbols: string) {
    try {
      // console.log(symbols);
      const { data } = await axios.get(
        'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/news',
        {
          params: { ticker: symbols },
          headers: {
            'x-rapidapi-key': this.RAPID_API_KEY,
            'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
          },
        }
      );

      // console.log(data);
      const articles = data?.body || [];

      return articles.map(item => ({
        source: 'yahoo',
        title: item.title,
        summary: item.description,
        url: item.link,
        publishedAt: item.pubDate,
        tickers: item.relatedTickers,
        image: item.thumbnail?.resolutions?.[0]?.url ?? null,
      })) .filter(article => this.isRecent(article.publishedAt));
    } catch (err) {
      console.log('Yahoo news error:', err);
      return [];
    }
  }

  /* ================================
     MARKETAUX
  ================================= */
  private async getMarketauxNews(symbols: string) {
    try {
      const { data } = await axios.get(
        `https://api.marketaux.com/v1/news/all`,
        {
          params: {
            symbols,
            language: 'en',
            filter_entities: true,
            limit: 10,
            api_token: this.MARKETAUX_KEY,
          },
        }
      );

      return (data?.data || []).map(item => ({
        source: 'marketaux',
        title: item.title,
        summary: item.description,
        url: item.url,
        publishedAt: item.published_at,
        tickers: item.entities?.map(e => e.symbol) ?? [],
        image: item.image_url ?? null,
      }));
    } catch (err) {
      console.log('Marketaux error:', err.response?.data);
      return [];
    }
  }

  /* ================================
     FINNHUB
  ================================= */
  private async getFinnhubNews(symbols: string) {
    try {
      const symbol = symbols.split(',')[0]; // Finnhub supports single symbol

      const to = new Date();
      const fromDate = new Date();
      fromDate.setDate(to.getDate() - 2);

      const from = fromDate.toISOString().split('T')[0];
      const today = to.toISOString().split('T')[0];
      // console.log({
      //   symbol,
      //   from: '2024-01-01',
      //   to: today,
      //   tokenPresent: !!this.FINNHUB_KEY,
      //   token:this.FINNHUB_KEY
      // });

      const { data } = await axios.get(
        `https://finnhub.io/api/v1/company-news`,
        {
          params: {
            symbol,
            from,
            to: today,
            token: this.FINNHUB_KEY,
          },
        }
      );



      return (data || []).map(item => ({
        source: 'finnhub',
        title: item.headline,
        summary: item.summary,
        url: item.url,
        publishedAt: new Date(item.datetime * 1000).toISOString(),
        tickers: [symbol],
        image: item.image ?? null,
      }));
    } catch (err) {
      console.log('Finnhub error:', err.response?.data);
      return [];
    }
  }

  private dedupeNews(articles: any[]) {
    const seen = new Map<string, any>();
  
    for (const article of articles) {
      const normalizedTitle = this.normalizeText(article.title);
      const domain = this.extractDomain(article.url);
  
      // 30 min window to avoid near-duplicate reposts
      const timeBucket = article.publishedAt
        ? Math.floor(new Date(article.publishedAt).getTime() / (30 * 60 * 1000))
        : 'no-time';
  
      const key = `${normalizedTitle}|${domain}|${timeBucket}`;
  
      if (!seen.has(key)) {
        seen.set(key, article);
      } else {
        // Prefer richer article if duplicate found
        const existing = seen.get(key);
  
        if (
          (article.summary?.length || 0) >
          (existing.summary?.length || 0)
        ) {
          seen.set(key, article);
        }
      }
    }
  
    return Array.from(seen.values());
  }
  
  private normalizeText(text: string = ''): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  private extractDomain(url: string = ''): string {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'unknown';
    }
  }  

private isRecent(date: string, hours = 48): boolean {
  if (!date) return false;

  const published = new Date(date);
  const now = new Date();

  const diff = (now.getTime() - published.getTime()) / (1000 * 60 * 60);
  return diff <= hours;
}

private formatSymbol(symbol: string): string {
  if (!symbol.includes('.')) {
    return `${symbol}.NS`; // adjust if needed
  }
  return symbol;
}

private isRelevant(article: any, symbol: string): boolean {
  const title = article.title?.toLowerCase() || '';
  const summary = article.summary?.toLowerCase() || '';
  const s = symbol.toLowerCase();

  return title.includes(s) || summary.includes(s);
}


}

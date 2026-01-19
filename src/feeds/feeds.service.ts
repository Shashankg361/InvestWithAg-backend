import { Injectable } from '@nestjs/common';
import { NewsApiService } from 'src/integrations/news-api/news-api.service';
import { StockApiService } from 'src/integrations/stock-api/stock-api.service';
import { FeedAiService } from './feed-ai/feed-ai.service';

@Injectable()
export class FeedsService {
    constructor(private readonly newsApiService:NewsApiService,
        private readonly stockApiservice:StockApiService,
        private readonly feedsAiService:FeedAiService
    ){} 

    async generateInitalFeed(sysmbol:string){
        const news = await this.newsApiService.getAllStockNews(sysmbol);
        //console.log("I'm new",news,sysmbol);
        const stockData = await this.stockApiservice.getStockQuote(sysmbol);

        const param = {
            stockContext:this.normalizeStock(stockData),
            newsContext:this.normalizeNews(news.articles),
            isInitial:true
        }
        //return this.feedsAiService.generateFeed(param);
        return this.feedsAiService.generateFeedAiContext(param);
    }

    normalizeNews(articles: any[]) {
        return {
          ticker: articles[0]?.tickers?.[0],
          headlines: articles.slice(0, 2).map(a => a.title),
          combinedSummary: articles
            .map(a => a.summary)
            .join(' ')
            .slice(0, 450) // HARD LIMIT
        };
      }

    normalizeStock(stock: any) {
        return {
            symbol: stock.symbol,
            companyName: stock.name,
            priceChangePercent: Number(stock.changePercent.toFixed(2)),
            direction:
            stock.changePercent > 0 ? 'UP' :
            stock.changePercent < 0 ? 'DOWN' :
            'FLAT'
        }; 
    } 
       
      
} 

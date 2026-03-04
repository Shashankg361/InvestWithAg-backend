import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/entites/News.entity';
import { PriceSnapshot } from 'src/entites/PriceSnapshot.entity';
import { Stock } from 'src/entites/stock.entity';
import { NewsApiService } from 'src/integrations/news-api/news-api.service';
import { StockApiService } from 'src/integrations/stock-api/stock-api.service';
import { Repository } from 'typeorm';

@Injectable()
export class SnapshotService {

    constructor(private readonly stockApiService:StockApiService,
        private readonly newsAPiService: NewsApiService,
        
        @InjectRepository(PriceSnapshot)
        private readonly priceSnapshotRepo: Repository<PriceSnapshot>,

        @InjectRepository(News)
        private readonly newsRepo: Repository<News>
    ){}

    async captureSnapshot(stock: Stock) {
      console.log("Collecting snapshot for", stock.symbol);
    
      const formattedSymbol = this.formatSymbol(stock);
    
      try {
        const priceSnapshot = await this.stockApiService.getStockQuote(formattedSymbol);
    
        if (priceSnapshot?.price) {
          await this.savePriceSnapshot(stock.id, priceSnapshot);
        }
    
      } catch (error) {
        console.error(`Price fetch failed for ${formattedSymbol}`);
      }
    
      try {
        const newsResponse =
          await this.newsAPiService.getAllStockNews(stock.symbol);
      
        console.log("News count:", newsResponse.count);
      
        if (newsResponse.success && newsResponse.articles.length > 0) {
          await this.saveNewsSnapshots(stock.id, newsResponse.articles);
        }
      
      } catch (error) {
        console.error(`News fetch failed for ${stock.symbol}`, error);
      }
    
      console.log(`Snapshot stored for ${stock.symbol}`);
    }
    

      private formatSymbol(stock: Stock): string {
        if (stock.exchange === 'NSE') {
          return `${stock.symbol}.NS`;
        }
      
        if (stock.exchange === 'BSE') {
          return `${stock.symbol}.BO`; // IMPORTANT: BO not BS
        }
      
        // Foreign stocks (US etc.)
        return stock.symbol;
      }

      private async savePriceSnapshot(stockId: number, data: any) {
        const snapshot = this.priceSnapshotRepo.create({
          stockId,
          price: data.price,
          changePercent: data.changePercent,
          volume: data.volume,
          snapshotTime: new Date(),
        });
      
        await this.priceSnapshotRepo.save(snapshot);
      }

      private async saveNewsSnapshots(stockId: number, newsList: any[]) {

        for (const article of newsList) {
      
          if (!article.title) {
            console.log("Skipping article without title");
            continue;
          }
      
          const existing = await this.newsRepo.findOne({
            where: {
              stockId,
              title: article.title,
            },
          });
      
          if (existing) continue;
      
          const news = this.newsRepo.create({
            stockId,
            title: article.title,
            summary: article.summary || '',
            source: article.source || 'Unknown',
            sentiment: article.sentiment || 'neutral',
            publishedAt: article.publishedAt
              ? new Date(article.publishedAt)
              : new Date(),
          });
      
          try {
            await this.newsRepo.save(news);
            console.log("Saved news:", article.title);
          } catch (err) {
            console.error("Error saving news:", err);
          }
        }
      }
      
      

}

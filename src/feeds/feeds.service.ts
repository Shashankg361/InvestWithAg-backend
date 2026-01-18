import { Injectable } from '@nestjs/common';
import { NewsApiService } from 'src/integrations/news-api/news-api.service';
import { StockApiService } from 'src/integrations/stock-api/stock-api.service';
import { FeedAiService } from './feed-ai/feed-ai.service';

@Injectable()
export class FeedsService {
    constructor(private readonly newService:NewsApiService,
        private readonly stockApiservice:StockApiService,
        private readonly feedsAiService:FeedAiService
    ){}

    async generateInitalFeed(sysmbol:string){
        const news = await this.newService.getAllStockNews(sysmbol);
        //console.log("I'm new",news,sysmbol);
        const stockData = await this.stockApiservice.getStockQuote(sysmbol);

        const param = {
            stock:stockData,
            news:news,
            isInitial:true
        }
        //return this.feedsAiService.generateFeed(param);
        return this.feedsAiService.test();
    }
} 

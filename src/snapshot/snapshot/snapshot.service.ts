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

   async captureSnapshot(stock:Stock){
        console.log("let's collect snapshot",stock);

        const priceSnapshot = this.stockApiService.getStockQuote(stock.symbol);

    }

}

import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { StockApiModule } from 'src/integrations/stock-api/stock-api.module';
import { NewsApiModule } from 'src/integrations/news-api/news-api.module';

@Module({
  imports: [StockApiModule,NewsApiModule],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}

import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { FeedsModule } from 'src/feeds/feeds.module';
import { NewsApiModule } from 'src/integrations/news-api/news-api.module';
import { StockApiModule } from 'src/integrations/stock-api/stock-api.module';

@Module({
  imports:[FeedsModule,NewsApiModule,StockApiModule],
  providers: [SchedulerService]
})
export class SchedulerModule {}

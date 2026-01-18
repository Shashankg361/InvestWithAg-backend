import { Module } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';
import { FeedAiService } from './feed-ai/feed-ai.service';
import { NewsApiModule } from 'src/integrations/news-api/news-api.module';
import { StockApiModule } from 'src/integrations/stock-api/stock-api.module';

@Module({
  imports:[
    NewsApiModule,
    StockApiModule
  ],
  controllers: [FeedsController],
  providers: [FeedsService, FeedAiService]
})
export class FeedsModule {}

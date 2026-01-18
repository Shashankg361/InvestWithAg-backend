import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StocksModule } from './stocks/stocks.module';
import { StockApiModule } from './integrations/stock-api/stock-api.module';
import { NewsApiModule } from './integrations/news-api/news-api.module';
import { ConfigModule } from '@nestjs/config';
import { FeedGenerationModule } from './integrations/feed-generation/feed-generation.module';
import { FeedsModule } from './feeds/feeds.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [StocksModule,
     StockApiModule,
      NewsApiModule,
      ConfigModule.forRoot({
        isGlobal: true, // makes env vars available everywhere
      }),
      ScheduleModule.forRoot(),
      FeedGenerationModule,
      FeedsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { NewsApiService } from './news-api.service';

@Module({
  providers: [NewsApiService],
  exports: [NewsApiService]
})
export class NewsApiModule {}

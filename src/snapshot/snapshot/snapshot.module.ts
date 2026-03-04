import { Module } from '@nestjs/common';
import { SnapshotService } from './snapshot.service';
import { StockApiModule } from 'src/integrations/stock-api/stock-api.module';
import { NewsApiModule } from 'src/integrations/news-api/news-api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceSnapshot } from 'src/entites/PriceSnapshot.entity';
import { News } from 'src/entites/News.entity';

@Module({
  imports: [
    StockApiModule,
    NewsApiModule,
    TypeOrmModule.forFeature([PriceSnapshot,News])
  ],
  providers: [SnapshotService],
  exports: [SnapshotService]
})
export class SnapshotModule {}

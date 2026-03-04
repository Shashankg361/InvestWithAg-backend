import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { FeedsModule } from 'src/feeds/feeds.module';
import { NewsApiModule } from 'src/integrations/news-api/news-api.module';
import { StockApiModule } from 'src/integrations/stock-api/stock-api.module';
import { UserService } from 'src/users/user/user.service';
import { SnapshotService } from 'src/snapshot/snapshot/snapshot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../../users/user/user.module';
import { SnapshotModule } from '../../snapshot/snapshot/snapshot.module';

@Module({
  imports:[
    FeedsModule,
    NewsApiModule,
    StockApiModule,
    UserModule,
    SnapshotModule
  ],
  providers: [SchedulerService] 
})
export class SchedulerModule {}

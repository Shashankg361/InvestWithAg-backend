import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StocksModule } from './stocks/stocks.module';
import { StockApiModule } from './integrations/stock-api/stock-api.module';
import { NewsApiModule } from './integrations/news-api/news-api.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FeedGenerationModule } from './integrations/feed-generation/feed-generation.module';
import { FeedsModule } from './feeds/feeds.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UserRegistrationModule } from './user-registration/user-registration.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { SchedulerModule } from './scheduler/scheduler/scheduler.module';
import { TriggerModule } from './trigger/trigger/trigger.module';
import { SnapshotModule } from './snapshot/snapshot/snapshot.module';
import { UserModule } from './users/user/user.module';

@Module({
  imports: [StocksModule, 
     StockApiModule,
      NewsApiModule,
      ConfigModule.forRoot({
        isGlobal: true, // makes env vars available everywhere
      }),
      ScheduleModule.forRoot(),
      FeedGenerationModule,
      FeedsModule,
      UserRegistrationModule,
    
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>({
        type:'postgres',
        host: config.get('DB_HOST'),
        port:Number(config.get('DB_PORT')),
        username:config.get('DB_USERNAME'),
        password:config.get('DB_PASSWORD'),
        database:config.get('DB_NAME'),
        autoLoadEntities:true,
        synchronize:false,
      })
    }),
    
    SchedulerModule,
    
    TriggerModule,
    
    SnapshotModule,
    
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Controller, Get, Query } from '@nestjs/common';
import { FeedsService } from './feeds.service';

@Controller('feeds')
export class FeedsController {
  constructor(private readonly feedsService: FeedsService) {}

  @Get()
  generateInitalfeed(@Query('symbol') sysmbol:string){
    return this.feedsService.generateInitalFeed(sysmbol);
  }
}

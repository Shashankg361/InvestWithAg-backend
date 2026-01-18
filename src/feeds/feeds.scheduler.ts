import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { FeedsService } from "./feeds.service";

@Injectable()
export class FeedScheduler{
    constructor(private readonly feedService:FeedsService){}

    @Cron('0 * * * *')
    async generateFeed(){
        await this.feedService.generateInitalFeed("TCS.NS")
    }
}
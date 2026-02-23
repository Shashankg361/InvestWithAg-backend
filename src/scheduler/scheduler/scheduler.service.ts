import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { privateDecrypt } from 'crypto';
import { SnapshotService } from 'src/snapshot/snapshot/snapshot.service';
import { UserService } from 'src/users/user/user.service';

@Injectable()
export class SchedulerService {
    constructor(
        private readonly userService: UserService,
        private readonly snapShotService: SnapshotService
    ){}

    @Cron('*/5 * * * *')
    async handletrigger(){
        console.log("Hey there I'm running", new Date());

        const stocks = this.userService.getDistinctStocks();

        (await stocks).forEach(stock=>{
            this.snapShotService.captureSnapshot(stock)
        })

        console.log('Snapshots collected successfully');
    }
}
 
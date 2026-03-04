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

    @Cron('0 */15 * * * *') 
    async handletrigger(){
        console.log("Hey there I'm running", new Date());

        const stocks =  await this.userService.getDistinctStocks();

        for (const stock of stocks) {
            await this.snapShotService.captureSnapshot(stock);
        
            // delay 1.5 seconds between API calls
            await new Promise(resolve => setTimeout(resolve, 1500));
          }

        console.log('Snapshots collected successfully');
    }
}
 
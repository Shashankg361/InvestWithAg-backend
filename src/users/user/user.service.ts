import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { promises } from 'dns';
import { Stock } from 'src/entites/stock.entity';
import { UserHolding } from 'src/entites/usersHoldings.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor( 
        @InjectRepository(UserHolding)
        private readonly userHoldingRepo: Repository<UserHolding> ){}

    // async onModuleInit() {
    //     const stocks = await this.getDistinctStocks();
    //     console.log('Stocks:', stocks);
    //   }
        
    async getDistinctStocks():Promise<Stock[]>{
        const rows= await this.userHoldingRepo
        .createQueryBuilder('holdings')
        .leftJoinAndSelect('holdings.stock','stock')
        .distinct(true)
        .getMany();

        const stockMap = new Map<Number,Stock>();
        // console.log("rows",rows);

        for(let row of rows){
            stockMap.set(row.stock.id,row.stock);
        }
        return Array.from(stockMap.values());
    }
}

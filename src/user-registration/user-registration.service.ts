import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cdslDematAccountEntity } from 'src/entites/cdsldemataccount.entity';
import { cdslHoldingsEntity } from 'src/entites/cdslholdings.entity';
import { Stock } from 'src/entites/stock.entity';
import { usersEntity } from 'src/entites/users.entity';
import { UserHolding } from 'src/entites/usersHoldings.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRegistrationService {
    constructor(
        @InjectRepository(usersEntity) 
        private usersRepo : Repository<usersEntity>,

        @InjectRepository(cdslDematAccountEntity)
        private cdslDematAccountRepo : Repository<cdslDematAccountEntity>,

        @InjectRepository(cdslHoldingsEntity)
        private cdslholdingsRepo : Repository<cdslHoldingsEntity>,

        @InjectRepository(UserHolding)
        private userHoldingRepo : Repository<UserHolding>,

        @InjectRepository(Stock)
        private stockRepo : Repository<Stock>
    ){}

    // async checkAndLogin(panNumber:string){
    //     try{
    //         const user = await this.usersRepo.findOne({where:{pan:panNumber}});
    //         if(user){
    //             return {
    //                 success:true,
    //                 message:"Logged In",
    //                 data:user
    //             }
    //         }

    //         const dematAccount = await this.cdslDematAccountRepo.findOne({where :{pan:panNumber}})
    //         if(!dematAccount) return {
    //             success:false,
    //             message:"No demat account found",
    //             data:null
    //         };

    //         const newUser = await this.usersRepo.create({
    //             name:dematAccount.name,
    //             pan:dematAccount.pan,
    //             email:dematAccount.email
    //         })
 
    //         const savedUser = await this.usersRepo.save(newUser);

    //         const holdings = await this.cdslholdingsRepo.find({where:{demat_account_id:dematAccount.id}});
 
            

    //     }catch(err){}
    // }

    
    async checkAndLogin(panNumber: string) {
        try {
      
          const dematAccount = await this.cdslDematAccountRepo.findOne({
            where: { pan: panNumber },
          });
      
          if (!dematAccount) {
            return {
              success: false,
              message: "No demat account found",
              data: null,
            };
          }
      
          let user = await this.usersRepo.findOne({
            where: { pan: panNumber },
          });
      
          // 🟢 If user does not exist → create
          if (!user) {
            const newUser = this.usersRepo.create({
              name: dematAccount.name,
              pan: dematAccount.pan,
              email: dematAccount.email,
            });
      
            user = await this.usersRepo.save(newUser);
          }
      
          // 🔥 Always sync holdings (new or existing user)
          await this.syncUserHoldings(dematAccount, user);
       
          return {
            success: true,
            message: "Logged In",
            data: user,
          };
      
        } catch (err) {
          throw err;
        }
      }
      
      async syncUserHoldings(dematAccount: any, user: any) {

        const cdslHoldings = await this.cdslholdingsRepo.find({
          where: { demat_account_id: dematAccount.id },
        });
      
        for (const holding of cdslHoldings) {
      
          // 1️⃣ Find stock by ISIN
          const stock = await this.stockRepo.findOne({
            where: { isin: holding.isin },
          });
      
          if (!stock) continue;
      
          // 2️⃣ Check if user already has this stock
          const existingUserHolding = await this.userHoldingRepo.findOne({
            where: {
              user: { id: user.id },
              stock: { id: stock.id },
            },
            relations: ['user', 'stock'],
          });
      
          if (existingUserHolding) {
            // 🔁 Update quantity & avg price
            existingUserHolding.quantity = holding.quantity;
            existingUserHolding.avgBuyPrice = holding.avg_price;
      
            await this.userHoldingRepo.save(existingUserHolding);
       
          } else {
            // ➕ Insert new holding
            const newHolding = this.userHoldingRepo.create({
              user,
              stock,
              quantity: holding.quantity,
              avgBuyPrice: holding.avg_price,
            });
      
            await this.userHoldingRepo.save(newHolding);
          }
        }
      }
}

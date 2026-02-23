import { Module } from '@nestjs/common';
import { UserRegistrationService } from './user-registration.service';
import { UserRegistrationController } from './user-registration.controller';
import { usersEntity } from 'src/entites/users.entity';
import { cdslDematAccountEntity } from 'src/entites/cdsldemataccount.entity';
import { cdslHoldingsEntity } from 'src/entites/cdslholdings.entity';
import { UserHolding } from 'src/entites/usersHoldings.entity';
import { Stock } from 'src/entites/stock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      cdslDematAccountEntity,
      cdslHoldingsEntity,
      UserHolding,
      usersEntity,
      Stock
    ]),
  ], 
  controllers: [UserRegistrationController],
  providers: [UserRegistrationService],
}) 
export class UserRegistrationModule {}

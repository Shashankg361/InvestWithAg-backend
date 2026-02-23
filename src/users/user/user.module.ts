import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserHolding } from 'src/entites/usersHoldings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      UserHolding
    ])
  ],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}

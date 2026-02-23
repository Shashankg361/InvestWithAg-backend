import { Controller, Get, Query } from '@nestjs/common';
import { UserRegistrationService } from './user-registration.service';

@Controller('user-registration')
export class UserRegistrationController {
  constructor(private readonly userRegistrationService: UserRegistrationService) {}

  @Get()
  login(@Query('pan') pan:string){ 
    console.log("working");
    return this.userRegistrationService.checkAndLogin(pan);
  } 
}



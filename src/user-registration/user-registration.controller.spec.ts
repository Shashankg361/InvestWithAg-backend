import { Test, TestingModule } from '@nestjs/testing';
import { UserRegistrationController } from './user-registration.controller';
import { UserRegistrationService } from './user-registration.service';

describe('UserRegistrationController', () => {
  let controller: UserRegistrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRegistrationController],
      providers: [UserRegistrationService],
    }).compile();

    controller = module.get<UserRegistrationController>(UserRegistrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

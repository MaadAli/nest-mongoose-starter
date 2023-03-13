import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { HelperService } from '../common/utilities/helper.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Users, UsersDocument } from '../database/users.schema';
import { MockDatabase } from '../common/mocks/database.mock';
import { Model } from 'mongoose';
import { UsersModel } from '../users/users.model';

describe('AuthController', () => {
  let controller: AuthController;
  let mockModel: Model<UsersDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: getModelToken(Users.name),
          useClass: MockDatabase,
        },
        AuthService,
        JwtService,
        HelperService,
        ConfigService,
        UsersService,
        UsersModel,
      ],
    }).compile();

    mockModel = module.get<Model<UsersDocument>>(getModelToken(Users.name));
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

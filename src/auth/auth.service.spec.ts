import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { HelperService } from '../common/utilities/helper.service';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { UsersModel } from '../users/users.model';
import { MockDatabase } from '../common/mocks/database.mock';
import { getModelToken } from '@nestjs/mongoose';
import { Users, UsersDocument } from '../database/users.schema';
import { Model } from 'mongoose';

describe('AuthService', () => {
  let service: AuthService;
  let mockModel: Model<UsersDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Users.name),
          useClass: MockDatabase,
        },
        AuthService,
        HelperService,
        JwtService,
        ConfigService,
        UsersService,
        UsersModel,
      ],
    }).compile();

    mockModel = module.get<Model<UsersDocument>>(getModelToken(Users.name));
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

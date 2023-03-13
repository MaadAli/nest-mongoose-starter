import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Users, UsersDocument } from '../database/users.schema';
import { UsersModel } from './users.model';
import { UsersService } from './users.service';
import { Model } from 'mongoose';
import { MockDatabase } from '../common/mocks/database.mock';

describe('UsersService', () => {
  let service: UsersService;
  let mockModel: Model<UsersDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersModel,
        {
          provide: getModelToken(Users.name),
          useClass: MockDatabase,
        },
      ],
    }).compile();
    mockModel = module.get<Model<UsersDocument>>(getModelToken(Users.name));
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

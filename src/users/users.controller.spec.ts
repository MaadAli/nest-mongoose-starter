import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Users, UsersDocument, UsersSchema } from '../database/users.schema';
import { UsersController } from './users.controller';
import { UsersModel } from './users.model';
import { UsersService } from './users.service';
import { MockDatabase } from '../common/mocks/database.mock';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let mockModel: Model<UsersDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        UsersModel,
        {
          provide: getModelToken(Users.name),
          useValue: MockDatabase,
        },
      ],
    }).compile();

    mockModel = module.get<Model<UsersDocument>>(getModelToken(Users.name));
    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

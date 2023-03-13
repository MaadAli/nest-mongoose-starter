import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from '../common/dto/users.dto';
import { UsersModel } from './users.model';
import { Users } from '../database/users.schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersModel: UsersModel) {}

  async getUser(email: string): Promise<Users> {
    return await this.usersModel.findOne({ email });
  }

  async createUser(createUsersDto: CreateUsersDto): Promise<Users> {
    const createdUser = await this.usersModel.save(createUsersDto);
    return createdUser;
  }

  async getUsers(): Promise<Users[]> {
    return await this.usersModel.findAll();
  }
}

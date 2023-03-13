import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsersDto } from '../common/dto/users.dto';
import { GenericModel } from '../common/interfaces/generic.model';
import { Users, UsersDocument } from '../database/users.schema';

@Injectable()
export class UsersModel implements GenericModel<Users> {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>,
  ) {}
  find(filter: any): Promise<Users[]> {
    throw new Error('Method not implemented.');
  }
  async findOne(filter: any): Promise<Users> {
    console.log('filter', filter);
    return this.usersModel.findOne({ ...filter });
  }
  async get(id: string): Promise<Users> {
    return this.usersModel.findById(id);
  }
  findByIdAndUpdate(id: string, item: Users) {
    throw new Error('Method not implemented.');
  }

  async save(createUsersDto: CreateUsersDto): Promise<Users> {
    const createdUser = new this.usersModel(createUsersDto);
    return createdUser.save();
  }

  async findAll(): Promise<Users[]> {
    return this.usersModel.find();
  }
}

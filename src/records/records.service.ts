import { Injectable } from '@nestjs/common';
import { CreateRecordsDto } from 'src/common/dto/records.dto';
import { Records } from 'src/database/records.schema';
import { RecordsModel } from './records.model';

@Injectable()
export class RecordsService {
  constructor(private readonly recordsModel: RecordsModel) {}

  async getRecord(id: string): Promise<Records> {
    return await this.recordsModel.findOne({ id });
  }

  async createRecord(
    createRecordsDto: CreateRecordsDto,
    userId: string,
  ): Promise<Records> {
    const createdRecord = await this.recordsModel.save({
      ...createRecordsDto,
      user: userId,
      category: null,
    });
    return createdRecord;
  }

  async getRecords(user: string): Promise<Records[]> {
    console.log('userId', user);
    return await this.recordsModel.find({ user });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecordsDto } from '../common/dto/records.dto';
import { GenericModel } from '../common/interfaces/generic.model';
import { Records, RecordsDocument } from '../database/records.schema';

@Injectable()
export class RecordsModel implements GenericModel<Records> {
  constructor(
    @InjectModel(Records.name)
    private readonly RecordsModel: Model<RecordsDocument>,
  ) {}
  findAll(): Promise<Records[]> {
    throw new Error('Method not implemented.');
  }
  async findOne(filter: any): Promise<Records> {
    console.log('filter', filter);
    return this.RecordsModel.findOne({ ...filter });
  }
  async get(id: string): Promise<Records> {
    return this.RecordsModel.findById(id);
  }
  findByIdAndUpdate(id: string, item: Records) {
    throw new Error('Method not implemented.');
  }

  async save(createRecordsDto: Records): Promise<Records> {
    const createdRecord = new this.RecordsModel(createRecordsDto);
    return createdRecord.save();
  }

  async find(filter: any): Promise<Records[]> {
    console.log('filter', filter);
    return this.RecordsModel.find({ ...filter });
  }
}

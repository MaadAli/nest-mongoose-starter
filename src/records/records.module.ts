import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HelperService } from 'src/common/utilities/helper.service';
import { Records, RecordsSchema } from 'src/database/records.schema';
import { RecordsController } from './records.controller';
import { RecordsModel } from './records.model';
import { RecordsService } from './records.service';

@Module({
  imports: [
    Records,
    MongooseModule.forFeature([{ name: Records.name, schema: RecordsSchema }]),
  ],
  controllers: [RecordsController],
  providers: [RecordsService, RecordsModel],
})
export class RecordsModule {}

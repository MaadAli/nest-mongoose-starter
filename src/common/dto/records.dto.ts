import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Records } from 'src/database/records.schema';
import { constants } from '../constants';

export class CreateRecordsDto extends PickType(Records, [
  'amount',
  'note',
  'type',
]) {
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    type: String,
  })
  @IsString()
  note: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsIn([constants.INCOME, constants.EXPENSE])
  type: string;
}

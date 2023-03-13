import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { CategoriesDocument } from './categories.schema';
import { UsersDocument } from './users.schema';

export type RecordsDocument = Document & Records;
@Schema({ timestamps: true })
export class Records {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: false })
  note: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Users' })
  user: string | Types.ObjectId | UsersDocument;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Categories' })
  category: string | Types.ObjectId | CategoriesDocument;
}

export const RecordsSchema = SchemaFactory.createForClass(Records);

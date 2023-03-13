import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { UsersDocument } from './users.schema';

export type CategoriesDocument = Document & Categories;
@Schema({ timestamps: true })
export class Categories {
  @Prop({ required: true })
  name: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Users' })
  user: string | Types.ObjectId | UsersDocument;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);

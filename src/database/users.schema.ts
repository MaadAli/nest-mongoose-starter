import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsString } from 'class-validator';
import { Document, ObjectId } from 'mongoose';

export type UsersDocument = Document & Users;

@Schema({ timestamps: true })
export class Users {
  _id?: ObjectId;

  @IsString()
  @Prop({ required: true })
  firstName: string;

  @IsString()
  @Prop({ required: true })
  lastName: string;

  @IsEmail()
  @Prop({ required: true })
  email: string;

  @IsString()
  @Prop({ required: true })
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

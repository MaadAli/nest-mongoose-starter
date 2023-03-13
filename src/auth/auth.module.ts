import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport/dist';
import { HelperService } from 'src/common/utilities/helper.service';
import { Users, UsersSchema } from 'src/database/users.schema';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { AuthJwtModule } from '../config/auth.config';
import { LocalStrategy } from '../strategies/local.strategy';
import { UsersModel } from '../users/users.model';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    Users,
    ConfigModule,
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    PassportModule,
    AuthJwtModule,
  ],
  controllers: [AuthController],
  providers: [
    UsersService,
    UsersModel,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    HelperService,
  ],
})
export class AuthModule {}

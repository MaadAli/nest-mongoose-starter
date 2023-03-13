import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './config/config.validation';
import { DataBaseConfigModule } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NestModule } from '@nestjs/common/interfaces/modules';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { LoggerConfigModule } from './config/logger.config';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [
    DataBaseConfigModule,
    ConfigurationModule,
    AuthModule,
    UsersModule,
    LoggerConfigModule,
    RecordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Body, Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { CreateRecordsDto } from 'src/common/dto/records.dto';
import { UserDto } from 'src/common/dto/users.dto';
import { Users } from 'src/database/users.schema';
import { HttpExceptionFilter } from 'src/filters/exception.filter';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RecordsService } from './records.service';

@ApiTags('auth')
@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @UseGuards(JwtGuard)
  @UseFilters(HttpExceptionFilter)
  @ApiBearerAuth()
  @Post('/createRecord')
  async createRecord(@Body() dto: CreateRecordsDto, @User() user: UserDto) {
    return this.recordsService.createRecord(dto, user.userId);
  }

  @UseGuards(JwtGuard)
  @UseFilters(HttpExceptionFilter)
  @ApiBearerAuth()
  @Get('/getRecords')
  async getRecords(@User() user: UserDto) {
    return this.recordsService.getRecords(null);
  }

  @UseGuards(JwtGuard)
  @UseFilters(HttpExceptionFilter)
  @ApiBearerAuth()
  @Get('/getUserRecords')
  async getUserRecords(@User() user: UserDto) {
    return this.recordsService.getRecords(user.userId);
  }
}

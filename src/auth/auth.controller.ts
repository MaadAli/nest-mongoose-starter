import {
  Controller,
  Request,
  UseGuards,
  Post,
  Get,
  Body,
} from '@nestjs/common';
import { UseFilters } from '@nestjs/common/decorators/core/exception-filters.decorator';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filters/exception.filter';
import { CreateUsersDto, LoginDto } from '../common/dto/users.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { LocalGuard } from '../guards/local.guard';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @ApiBody({
    type: LoginDto,
  })
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  @UseFilters(HttpExceptionFilter)
  async register(@Body() body: CreateUsersDto) {
    return this.authService.registerUser(body);
  }

  @UseGuards(JwtGuard)
  @UseFilters(HttpExceptionFilter)
  @ApiBearerAuth()
  @Get('/authpoint')
  async authEn() {
    return this.authService.getUsers();
  }

  @Get('/wauthpoint')
  async wauthEn() {
    return this.authService.getUsers();
  }
}

import { Injectable } from '@nestjs/common';
import { BadGatewayException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { ConflictExceptionError } from 'src/common/exceptions/custom.exception';
import { CreateUsersDto, LoginDto } from '../common/dto/users.dto';
import { HelperService } from '../common/utilities/helper.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly helperService: HelperService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.usersService.getUser(email);
    if (!user) {
      return null;
    }
    const match = await this.helperService.passwordVerifier(
      password,
      user.password,
    );
    console.log('user', user);
    console.log('hash', match);
    if (user && match) {
      return user._id;
    }

    return null;
  }

  async login(userId: string) {
    console.log('userId', userId);
    const payload = { userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser(userDto: CreateUsersDto) {
    const { email } = userDto;
    const user = await this.usersService.getUser(email);
    if (user) {
      throw new ConflictExceptionError('Email already exists', { key: 1 });
    }
    let { password } = userDto;
    password = await this.helperService.passwordGenerator(password);
    return await this.usersService.createUser({ ...userDto, password });
  }

  async getUsers() {
    return await this.usersService.getUsers();
  }
}

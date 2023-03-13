import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/common/dto/users.dto';
import { UnauthorizedExceptionError } from 'src/common/exceptions/custom.exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(req): Promise<any> {
    console.log('in validate', req.body);
    const loginDto: LoginDto = req.body;
    const user = await this.authService.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedExceptionError();
    }
    return user;
  }
}

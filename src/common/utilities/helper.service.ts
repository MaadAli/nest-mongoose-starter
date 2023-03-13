import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HelperService {
  constructor(readonly configService: ConfigService) {}

  async passwordGenerator(password: string) {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  async passwordVerifier(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}

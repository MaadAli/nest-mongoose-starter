import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const AuthJwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    signOptions: {
      expiresIn: configService.get<string>('JWT_EXP', '1d'),
    },
    secret: configService.get<string>('JWT_SECRET'),
  }),
});

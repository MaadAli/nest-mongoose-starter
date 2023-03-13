import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

export const ConfigurationModule = ConfigModule.forRoot({
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('dev', 'prod').default('dev').required(),
    MONGO_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXP: Joi.string().required(),
  }),
  isGlobal: true,
});

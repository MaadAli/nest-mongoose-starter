import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  setupBasicFunctionalities,
  setupDocumentation,
  setupValidation,
} from './common/utilities/bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  await setupValidation(app);
  await setupBasicFunctionalities(app);
  await setupDocumentation(app);
  await app.listen(3000);
}
bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

export async function setupBasicFunctionalities(app: INestApplication) {
  app.enableCors();
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
}

export async function setupDocumentation(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Expendutor')
    .setDescription('Expendutor App Description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await createOpenApiSpec(document);
}

export async function setupValidation(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({ forbidNonWhitelisted: true, transform: true }),
  );
}

async function createOpenApiSpec(document: OpenAPIObject) {
  const prettier = await import('prettier');

  const documentJson = JSON.stringify(document);
  const openApiSpecPath = 'openApiSpec.json';

  const openApiSpecContent = prettier.format(documentJson, {
    filepath: openApiSpecPath,
    tabWidth: 4,
    endOfLine: 'lf',
  });
  fs.writeFileSync(openApiSpecPath, openApiSpecContent);
}

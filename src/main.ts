import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';

import { RequestMethod } from '@nestjs/common';
import { AppModule } from './app.module';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('process.env.DATABASE_NAME', process.env.DATABASE_NAME);
console.log('process.env.DATABASE_USER', process.env.DATABASE_USER);
console.log('process.env.HARVESTER_API_USERNAME', process.env.HARVESTER_API_USERNAME);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
  const origins: string[] = process.env.CORS_ORIGIN_URL.split(',');
  app.enableCors({
    origin: origins,
  });
  app.use(helmet());
  const config = new DocumentBuilder()
    .setTitle('OasisBr API')
    .setDescription('The OasisBr API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/doc', app, document);
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();

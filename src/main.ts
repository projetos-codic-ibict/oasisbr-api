import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
  const origins: string[] = process.env.CORS_ORIGIN_URL.split(',');
  app.enableCors({
    origin: origins,
  });
  const config = new DocumentBuilder()
    .setTitle('OasisBr API')
    .setDescription('The OasisBr API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  app.use(helmet());
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();

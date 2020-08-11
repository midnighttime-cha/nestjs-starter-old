import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
const bodyParser = require('body-parser');

import { MyLogger } from './shared/logger/logger.service';
import { LoggingInterceptor } from './shared/interceptor/logging.interceptor';
import { HttpExceptionFilter } from './shared/filter/http-exception.filter';

const port = process.env.HOST_PORT || 3003;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), {
    logger: new MyLogger()
  });

  // Enable CORS
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalInterceptors(new LoggingInterceptor()); // Use interceptor from './shared/interceptor/logging.interceptor'
  app.useGlobalFilters(new HttpExceptionFilter()); // Use filter from './shared/filter/http-exception.filter'
  app.setGlobalPrefix('api/v1'); // Set prefix for API URL

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Swagger config
  const swaggerCustomOptions = {
    swaggerOptions: { docExpansion: 'list', defaultModelsExpandDepth: -1, filter: true },
  };

  const setVersion = '1.0 build 20200811.1823';

  const options = new DocumentBuilder()
    .addServer(`${process.env.API_PROD_HOST}`, 'PROD: Starter API') // URL for production
    .addServer(`${process.env.API_HOST}:${process.env.API_HOST_PORT}`, 'Local: Starter API') // URL for developement
    .setTitle('Starter API')
    .setDescription('The Starter API description')
    .setVersion(setVersion)
    .addBearerAuth()
    .setContact('Starter', `${process.env.API_HOST}`, `${process.env.API_EMAIL}`)
    .addTag('Authentication & Access')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs/api/v1', app, document, swaggerCustomOptions);
  // ---- //

  await app.listen(port);
  await Logger.warn("==============================")
  await Logger.log(`Server running on ${process.env.API_HOST}:${port}`, 'Bootstrap');
  await Logger.warn("==============================")
}
bootstrap();

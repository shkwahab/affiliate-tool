import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const serviceAccount = require('../credentials.json');

async function bootstrap() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  const app = await NestFactory.create(AppModule);
  // Set up allowed origins for CORS
  const allowedOrigins = ['http://localhost:3000'];
  app.enableCors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });

  // Set up Swagger for API documentation
  const config = new DocumentBuilder()
    .setTitle('Sunvoy Affiliate Tool API')
    .setDescription('API documentation for Sunvoy Affiliate Tool App')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}

bootstrap();

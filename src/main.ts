import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Hackathon API')
    .setDescription('Documentation of API')
    .setVersion('V0.0.1')
    .addTag('Hackathon API')
    .build();
  const documnet = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, documnet);
  await app.listen(Number(process.env.PORT));
}
bootstrap();

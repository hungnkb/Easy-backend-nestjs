import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const configService = new ConfigService()
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT = configService.get('PORT');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();

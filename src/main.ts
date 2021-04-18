import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); //позволит делать междоменные запросы
  await app.listen(5000);
}
bootstrap();

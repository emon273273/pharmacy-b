import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('🔑 DATABASE_URL loaded:', !!process.env.DATABASE_URL);
  await app.listen(process.env.PORT ?? 8001);
   console.log(`🚀 Server running on port ${process.env.PORT ?? 8001}`);
}
bootstrap();

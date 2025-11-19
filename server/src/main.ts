import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { PrismaService } from './database/prisma.service';
import * as cookieParser from 'cookie-parser';
import { helmetConfig } from './config/helmet.config';
import { setupSwagger } from './swagger/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.use(helmetConfig);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN') || 'http://localhost:5173',
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');

  const nodeEnv =
    configService.get<string>('NODE_ENV') ??
    process.env.NODE_ENV ??
    'development';
  if (nodeEnv !== 'production') {
    setupSwagger(app, configService);
  }

  const port = configService.get<number>('PORT') ?? 3000;

  await app.listen(port);
  console.log(`Server running on port ${port} in ${nodeEnv} mode`);
}
void bootstrap();

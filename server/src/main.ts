import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { PrismaService } from './database/prisma.service';
import { setupSwagger } from './swagger/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

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
    origin: '*',
  });
  app.setGlobalPrefix('api/v1');

  const nodeEnv =
    configService.get<string>('NODE_ENV') ??
    process.env.NODE_ENV ??
    'development';
  if (nodeEnv !== 'production') {
    setupSwagger(app);
  }

  const port = configService.get<number>('PORT') ?? 3000;

  await app.listen(port);
  console.log(`Server running on port ${port} in ${nodeEnv} mode`);
}
void bootstrap();

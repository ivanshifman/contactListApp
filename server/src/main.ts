import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './database/prisma.service';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { PORT } from 'config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(PORT ?? 3000);
}
void bootstrap();

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { PrismaService } from './database/prisma.service';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ContactModule,
    ConfigModule.forRoot({
      isGlobal: true,
    } as Record<string, unknown>),
  ],
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}

import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  INestApplication,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(private readonly configService: ConfigService) {
    const nodeEnv =
      configService.get<string>('NODE_ENV') ?? process.env.NODE_ENV;
    super({
      log: nodeEnv === 'production' ? [] : ['query', 'info', 'warn', 'error'],
      errorFormat: nodeEnv === 'production' ? 'minimal' : 'colorless',
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.$connect();
      this.logger.log('✅ Database connection established successfully.');
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.logger.error(`Known Prisma error: ${error.message}`);
      } else if (error instanceof Error) {
        this.logger.error(`Error connecting to database: ${error.message}`);
      }
      process.exit(1);
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    this.logger.log('🛑 Database connection closed.');
  }

  enableShutdownHooks(app: INestApplication): void {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.on('beforeExit', async () => {
      this.logger.log('🔌 Prisma disconnecting before app shutdown...');
      await app.close();
    });
  }
}

import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './swagger.config';
import { SWAGGER_API_ROOT } from './swagger.constants';
import { ConfigService } from '@nestjs/config';

export function setupSwagger(
  app: INestApplication,
  configService: ConfigService,
): void {
  const nodeEnv = configService.get<string>('NODE_ENV') ?? 'development';
  if (nodeEnv === 'production') return;

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(SWAGGER_API_ROOT, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'API Documentation - Contact List App',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  console.log(`📘 Swagger available at /${SWAGGER_API_ROOT}`);
}

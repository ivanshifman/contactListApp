import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './swagger.config';
import { SWAGGER_API_ROOT } from './swagger.constants';

export function setupSwagger(app: INestApplication): void {
  if (process.env.NODE_ENV === 'production') return;

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

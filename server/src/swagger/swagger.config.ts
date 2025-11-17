import { DocumentBuilder } from '@nestjs/swagger';
import {
  SWAGGER_API_TITLE,
  SWAGGER_API_DESCRIPTION,
  SWAGGER_API_VERSION,
  SWAGGER_BEARER_AUTH_NAME,
} from './swagger.constants';

export const swaggerConfig = new DocumentBuilder()
  .setTitle(SWAGGER_API_TITLE)
  .setDescription(SWAGGER_API_DESCRIPTION)
  .setVersion(SWAGGER_API_VERSION)
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Enter JWT token as: Bearer <token>',
    },
    SWAGGER_BEARER_AUTH_NAME,
  )
  .build();

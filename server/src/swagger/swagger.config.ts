import { DocumentBuilder } from '@nestjs/swagger';
import {
  SWAGGER_API_TITLE,
  SWAGGER_API_DESCRIPTION,
  SWAGGER_API_VERSION,
  SWAGGER_ACCESS_COOKIE_NAME,
} from './swagger.constants';

export const swaggerConfig = new DocumentBuilder()
  .setTitle(SWAGGER_API_TITLE)
  .setDescription(SWAGGER_API_DESCRIPTION)
  .setVersion(SWAGGER_API_VERSION)
  .addCookieAuth(SWAGGER_ACCESS_COOKIE_NAME, {
    type: 'apiKey',
    in: 'cookie',
    description: 'Access Token Cookie',
  })
  .build();

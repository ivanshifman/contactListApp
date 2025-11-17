import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateContactDto } from '../dto/create-contact.dto';

export function ApiCreateContactDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new contact',
      description:
        'Creates a new contact for the authenticated user. Requires a valid JWT token.',
    }),

    ApiBody({ type: CreateContactDto }),

    ApiResponse({
      status: 201,
      description: 'Contact created successfully',
      schema: {
        example: {
          id: 5,
          name: 'Ivan',
          lastname: 'Shifman',
          email: 'ivana@gmail.com',
          phone: '123456789',
          address: 'Street 1, 1922',
          userId: 1,
          createdAt: '2025-11-17T03:20:21.858Z',
        },
      },
    }),

    ApiResponse({
      status: 400,
      description: 'Validation error',
      schema: {
        example: {
          success: false,
          statusCode: 400,
          timestamp: '2025-11-17T03:22:58.009Z',
          message:
            'Name must contain only letters, name must be longer than or equal to 2 characters, name must be shorter than or equal to 50 characters, name must be a string',
          error: 'BadRequestException',
          stack: 'BadRequestException: Bad Request Exception\n...',
          path: '/api/v1/contact',
          method: 'POST',
        },
      },
    }),

    ApiResponse({
      status: 401,
      description: 'Authentication error - Missing or invalid JWT',
      schema: {
        example: {
          success: false,
          statusCode: 401,
          timestamp: '2025-11-17T03:21:26.240Z',
          message: 'Unauthorized',
          error: 'UnauthorizedException',
          stack: 'UnauthorizedException: Unauthorized\n...',
          path: '/api/v1/contact',
          method: 'POST',
        },
      },
    }),

    ApiResponse({
      status: 409,
      description: 'Field already exists (Prisma P2002)',
      schema: {
        example: {
          success: false,
          statusCode: 409,
          timestamp: '2025-11-17T03:21:10.445Z',
          message: 'A record with the field(s) [field] already exists.',
          error: 'PrismaClientKnownRequestError',
          stack:
            'PrismaClientKnownRequestError: ... Unique constraint failed on the fields: (`email`)\n...',
          path: '/api/v1/contact',
          method: 'POST',
        },
      },
    }),

    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
      schema: {
        example: {
          success: false,
          statusCode: 500,
          timestamp: '2025-11-17T03:23:45.123Z',
          message: 'Internal server error.',
          error: 'Error',
          stack: '...',
          path: '/api/v1/contact',
          method: 'POST',
        },
      },
    }),
  );
}

import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function ApiGetContactByIdDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get a contact by ID',
      description:
        'Returns a single contact belonging to the authenticated user. Requires a valid JWT token.',
    }),

    ApiParam({
      name: 'id',
      required: true,
      description: 'The ID of the contact to retrieve',
      type: Number,
    }),

    ApiResponse({
      status: 200,
      description: 'Contact retrieved successfully',
      schema: {
        example: {
          id: 5,
          name: 'Juan',
          lastname: 'Horte',
          email: 'juanv@gmail.com',
          phone: '1234567',
          address: 'Franklin 1927',
          userId: 1,
          createdAt: '2025-11-17T03:20:21.858Z',
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
          timestamp: '2025-11-17T03:17:33.851Z',
          message: 'Unauthorized',
          error: 'UnauthorizedException',
          stack: '...',
          path: '/api/v1/contact/5',
          method: 'GET',
        },
      },
    }),

    ApiResponse({
      status: 404,
      description: 'Contact not found',
      schema: {
        example: {
          success: false,
          statusCode: 404,
          timestamp: '2025-11-17T03:25:34.791Z',
          message: 'Contact not found',
          error: 'NotFoundException',
          stack: '...',
          path: '/api/v1/contact/5',
          method: 'GET',
        },
      },
    }),

    ApiResponse({
      status: 429,
      description: 'Too many requests',
      schema: {
        example: {
          success: false,
          statusCode: 429,
          timestamp: '2025-11-17T03:02:46.882Z',
          message: 'ThrottlerException: Too Many Requests',
          error: 'ThrottlerException',
          stack: '...',
          path: '/api/v1/contact/5',
          method: 'GET',
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
          timestamp: '2025-11-17T03:18:12.123Z',
          message: 'Internal server error.',
          error: 'Error',
          stack: '...',
          path: '/api/v1/contact/5',
          method: 'GET',
        },
      },
    }),
  );
}

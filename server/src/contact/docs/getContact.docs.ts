import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiGetContactsDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all contacts for the authenticated user',
      description:
        'Returns a list of all contacts belonging to the authenticated user. Requires a valid JWT token.',
    }),

    ApiResponse({
      status: 200,
      description: 'Contacts retrieved successfully',
      schema: {
        example: [
          {
            id: 1,
            name: 'Ivan',
            lastname: 'Shifman',
            email: 'ivan@gmail.com',
            phone: '12345678',
            address: 'Street 1, 1922',
            userId: 1,
            createdAt: '2025-11-15T05:05:34.591Z',
          },
        ],
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
          path: '/api/v1/contact',
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
          path: '/api/v1/contact',
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
          path: '/api/v1/contact',
          method: 'GET',
        },
      },
    }),
  );
}

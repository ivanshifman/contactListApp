import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiRefreshDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Token refresh', description: 'Validate refresh token' }),

    ApiResponse({
      status: 200,
      description: 'Token refreshed successfully',
      schema: {
        example: {
            message: 'Token refreshed',
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
          path: '/api/v1/auth/refresh',
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
          timestamp: '2025-11-17T03:10:00.000Z',
          message: 'Internal server error.',
          error: 'Error',
          stack: '...',
          path: '/api/v1/auth/refresh',
          method: 'POST',
        },
      },
    }),
  );
}
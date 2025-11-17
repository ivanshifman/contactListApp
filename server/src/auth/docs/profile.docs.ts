import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiProfileDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get authenticated user profile',
      description:
        'Returns the authenticated user data along with all contacts. Requires a valid JWT token.',
    }),

    ApiResponse({
      status: 200,
      description: 'Profile retrieved successfully',
      schema: {
        example: {
          id: 1,
          name: 'Ivan Sh',
          username: 'Ivan_Shif',
          createdAt: '2025-11-15T05:02:27.832Z',
          contacts: [
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
      },
    }),

    ApiResponse({
      status: 401,
      description: 'Authentication error - Missing or invalid JWT',
      schema: {
        example: {
          success: false,
          statusCode: 401,
          timestamp: '2025-11-17T03:06:07.756Z',
          message: 'Unauthorized',
          error: 'UnauthorizedException',
          stack: '...',
          path: '/api/v1/auth/profile',
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
          timestamp: '2025-11-17T03:06:55.123Z',
          message: 'Internal server error.',
          error: 'Error',
          stack: '...',
          path: '/api/v1/auth/profile',
          method: 'GET',
        },
      },
    }),
  );
}

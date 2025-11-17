import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';

export function ApiLoginDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Login user', description: 'Login user' }),
    ApiBody({ type: LoginDto }),

    ApiResponse({
      status: 200,
      description: 'User logged in successfully',
      schema: {
        example: {
          user: {
            id: 1,
            name: 'Ivan Sh',
            username: 'Ivan_Shif',
            createdAt: '2025-11-15T05:02:27.832Z',
          },
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6I...',
        },
      },
    }),

    ApiResponse({
      status: 400,
      description: 'Validation error OR invalid data sent to database',
      schema: {
        example: {
          success: false,
          statusCode: 400,
          timestamp: '2025-11-17T03:01:49.628Z',
          message: 'Invalid data sent to the database.',
          error: 'PrismaClientValidationError',
          stack: '...',
          path: '/api/v1/auth/login',
          method: 'POST',
        },
      },
    }),

    ApiResponse({
      status: 401,
      description: 'Incorrect credentials',
      schema: {
        example: {
          success: false,
          statusCode: 401,
          timestamp: '2025-11-17T03:02:46.882Z',
          message: 'The credentials are incorrect',
          error: 'UnauthorizedException',
          stack: '...',
          path: '/api/v1/auth/login',
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
          path: '/api/v1/auth/login',
          method: 'POST',
        },
      },
    }),
  );
}

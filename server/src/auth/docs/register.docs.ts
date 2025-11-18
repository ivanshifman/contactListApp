import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export function ApiRegisterDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Register new user',
      description:
        'Creates a new user in the system with the provided name, username, and password.',
    }),
    ApiBody({ type: CreateUserDto }),

    ApiResponse({
      status: 201,
      description: 'User created successfully',
      schema: {
        example: {
          id: 1,
          name: 'John Doe',
          username: 'john123',
          createdAt: '2025-11-17T02:51:36.431Z',
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
          timestamp: '2025-11-17T02:52:49.786Z',
          message:
            'property usernamea should not exist, username must be longer...',
          error: 'BadRequestException',
          stack: '...',
          path: '/api/v1/auth/register',
          method: 'POST',
        },
      },
    }),

    ApiResponse({
      status: 409,
      description: 'Username already exists',
      schema: {
        example: {
          success: false,
          statusCode: 409,
          timestamp: '2025-11-17T02:52:21.042Z',
          message: 'A record with the field(s) [username] already exists.',
          error: 'PrismaClientKnownRequestError',
          stack: '...',
          path: '/api/v1/auth/register',
          method: 'POST',
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
          path: '/api/v1/auth/register',
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
          timestamp: '2025-11-17T02:53:15.165Z',
          message: 'Internal server error.',
          error: 'Error',
          stack: '...',
          path: '/api/v1/auth/register',
          method: 'POST',
        },
      },
    }),
  );
}

import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { UpdateContactDto } from '../dto/update-contact.dto';

export function ApiUpdateContactDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update an existing contact',
      description:
        'Updates a contact belonging to the authenticated user. Requires a valid JWT and a valid contact ID.',
    }),

    ApiBody({
      type: UpdateContactDto,
    }),

    ApiParam({
      name: 'id',
      required: true,
      description: 'The ID of the contact to retrieve',
      type: Number,
    }),

    ApiResponse({
      status: 200,
      description: 'Contact updated successfully',
      schema: {
        example: {
          id: 5,
          name: 'Juan',
          lastname: 'Horte',
          email: 'juanv@gmail.com',
          phone: '1234567',
          address: 'Street 2, 1927',
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
          timestamp: '2025-11-17T03:26:26.761Z',
          message:
            'Name must contain only letters, name must be longer than or equal to 2 characters, name must be shorter than or equal to 50 characters, name must be a string',
          error: 'BadRequestException',
          stack: '...',
          path: '/api/v1/contact/5',
          method: 'PUT',
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
          timestamp: '2025-11-17T03:26:43.973Z',
          message: 'Unauthorized',
          error: 'UnauthorizedException',
          stack: '...',
          path: '/api/v1/contact/5',
          method: 'PUT',
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
          path: '/api/v1/contact/4',
          method: 'PUT',
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
          method: 'PUT',
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
          timestamp: '2025-11-17T03:27:10.123Z',
          message: 'Internal server error.',
          error: 'Error',
          stack: '...',
          path: '/api/v1/contact/5',
          method: 'PUT',
        },
      },
    }),
  );
}

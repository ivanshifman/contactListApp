import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  Injectable,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response, Request } from 'express';

@Catch()
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred. Please try again later.';
    const isProd = process.env.NODE_ENV === 'production';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (res && typeof res === 'object' && 'message' in res) {
        const msg = (res as Record<string, unknown>).message;
        message =
          typeof msg === 'string'
            ? msg
            : Array.isArray(msg)
              ? msg.join(', ')
              : message;
      }
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          status = HttpStatus.CONFLICT;
          message = 'A record with this unique field already exists.';
          break;
        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          message = 'The requested resource could not be found.';
          break;
        case 'P2003':
          status = HttpStatus.BAD_REQUEST;
          message = 'Operation failed due to a foreign key constraint.';
          break;
        case 'P2014':
          status = HttpStatus.BAD_REQUEST;
          message = 'Invalid relation or inconsistent reference detected.';
          break;
        default:
          status = HttpStatus.BAD_REQUEST;
          message = `Database error (code: ${exception.code}).`;
      }
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Invalid data sent to the database.';
    } else if (exception instanceof Prisma.PrismaClientInitializationError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Database connection failed.';
    } else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Unknown database error occurred.';
    } else if (exception instanceof Error) {
      message = isProd
        ? 'Internal server error.'
        : exception.message || message;
    }

    const stackTrace =
      exception instanceof Error ? (exception.stack ?? 'No stack trace') : '';

    if (!isProd) {
      this.logger.error(`❌ ${message}`, stackTrace);
    } else {
      this.logger.error(`❌ ${message}`);
    }

    const payload = {
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
      ...(!isProd && {
        error:
          exception instanceof Error
            ? exception.constructor.name
            : typeof exception,
        stack: stackTrace,
        path: request.url,
        method: request.method,
      }),
    };

    httpAdapter.reply(response, payload, status);
  }
}

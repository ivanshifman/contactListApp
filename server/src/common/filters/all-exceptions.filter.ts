import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

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
    }

    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
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
    }

    else if (exception instanceof Error) {
      const numericStatus = Number(status);

      if (numericStatus === Number(HttpStatus.INTERNAL_SERVER_ERROR)) {
        message = isProd
          ? 'Internal server error.'
          : exception.message || message;
      } else if (numericStatus >= 400 && numericStatus < 500) {
        message = isProd ? 'Invalid client request.' : exception.message;
      } else if (numericStatus >= 500) {
        message = isProd ? 'Server failure.' : exception.message;
      }
    }

    const stackTrace =
      exception instanceof Error ? (exception.stack ?? 'No stack trace') : '';

    if (!isProd) {
      this.logger.error(`❌ ${message}`, stackTrace);
    } else {
      this.logger.error(`❌ ${message}`);
    }

    const payload: Record<string, unknown> = {
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
    };

    if (!isProd) {
      payload.error =
        exception instanceof Error
          ? exception.constructor.name
          : typeof exception;
      payload.stack = stackTrace;
    }

    response.status(status).json(payload);
  }
}

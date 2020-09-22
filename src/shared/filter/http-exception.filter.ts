import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger;

  constructor() {
    this.logger = new Logger('HttpExceptionFilter');
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = exception.getStatus();

    const authorization = (`${request.headers.authorization}`.split('Bearer '))[1];
    if (authorization) {
      if (exception.getStatus() === HttpStatus.UNAUTHORIZED) {
        if (typeof exception.response !== 'string') {
          exception.response['message'] = exception.response.message || 'You do not have permission to access this resource';
        }
      } else if (exception.getStatus() == HttpStatus.FORBIDDEN) {
        const bearer = jwt.decode(authorization);
        if (bearer && bearer[`exp`]) {
          if (bearer[`exp`] < (Date.now() / 1000)) {
            if (typeof exception.response !== 'string') {
              exception.response['message'] = exception.response.message || 'You do not have permission to access this resource';
            }
          }
        }
      }
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toLocaleString(),
      path: request.url,
      method: request.method,
      message: "Error => " + (typeof exception.message.message !== 'undefined' ? exception.message.message : exception.message),
      displayTotal: 0,
      total: 0,
      state: null,
      items: {}
    };
    this.logger.error(errorResponse);

    response
      .status(status)
      .json(errorResponse);
  }
}

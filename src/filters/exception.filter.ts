import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Logger } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger();
  constructor() {
    super();
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    console.log('exce================', exception.response);

    const message = exception.response?.message
      ? exception.response?.message
      : '';
    console.log('mes================', message);

    const data: any = exception.response?.data
      ? exception.response?.data
      : exception.response?.message
      ? exception.response?.message
      : exception.response;

    console.log('data================', data);

    const type =
      exception instanceof Error ? exception.name : exception.message.error;

    console.log('type================', type);

    this.logger.error({
      status,
      success: false,
      data,
      type,
      message:
        status === HttpStatus.INTERNAL_SERVER_ERROR
          ? 'Sorry we are experiencing technical problems.'
          : message,
    });
    response.status(status).json({
      status,
      success: false,
      data,
      type,
      message:
        status === HttpStatus.INTERNAL_SERVER_ERROR
          ? 'Sorry we are experiencing technical problems.'
          : message,
    });
  }
}

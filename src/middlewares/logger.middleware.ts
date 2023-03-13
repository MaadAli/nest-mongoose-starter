import { NestMiddleware, Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger: Logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, path: url } = req;
    this.logger.log(`${method} ${url}`);

    res.on('close', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${ip}`,
      );
    });

    next();
  }
}

import {
  ConflictException,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common/exceptions';

export class BadRequestExceptionError extends BadRequestException {
  constructor(message = '', data = null) {
    super({ message, data });
  }
}

export class ConflictExceptionError extends ConflictException {
  constructor(message = '', data = {}) {
    super({ message, data });
  }
}

export class UnauthorizedExceptionError extends UnauthorizedException {
  constructor(message = '', data = {}) {
    super({ message, data });
  }
}

export class NotFoundExceptionError extends NotFoundException {
  constructor(message = '', data = {}) {
    super({ message, data });
  }
}

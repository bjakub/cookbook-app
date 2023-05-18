import { BadRequestException } from '@nestjs/common';
import { IExceptionError } from '../types/ExceptionError.interface';

export class CustomBadRequestException extends BadRequestException {
  constructor(exceptionError: IExceptionError) {
    super(exceptionError);
  }
}

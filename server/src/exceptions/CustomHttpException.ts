import { HttpException, HttpStatus } from '@nestjs/common';
import { IExceptionError } from '../types/ExceptionError.interface';

const DEFAULT_ERROR_MESSAGE = 'Internal error';

export class CustomHttpException extends HttpException {
  constructor(error: any) {
    const response: IExceptionError = {
      errorMessage:
        error.response && error.response.errorMessage
          ? error.response.errorMessage
          : DEFAULT_ERROR_MESSAGE,
      details:
        error.response && error.response.details ? error.response.details : [],
    };

    const status: HttpStatus = error.status
      ? error.status
      : HttpStatus.INTERNAL_SERVER_ERROR;

    console.log(error);

    super(response, status);
  }
}

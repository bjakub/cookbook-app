import { HttpException, InternalServerErrorException } from '@nestjs/common';

export const catchErrors = (e: any): Error => {
  if (e instanceof HttpException) {
    throw new HttpException(e.getResponse(), e.getStatus());
  }
  throw new InternalServerErrorException(
    e.message ? e.message : 'Unknown issue',
  );
};

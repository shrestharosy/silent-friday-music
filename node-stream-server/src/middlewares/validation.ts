import Joi from 'joi';

import { Response, NextFunction } from 'express';
import { IVerifiedRequest } from './verifyToken';
import { handleErrorObject } from '../utils/error';

export default function validationMiddleware(schema: Joi.SchemaLike) {
  return function(request: IVerifiedRequest, response: Response, next: NextFunction) {
    const { body } = request;

    Joi.validate(body, schema, (err, value) => {
      if (err) {
        next({
          status: 400,
          error: {
            message: handleErrorObject(err),
          },
        });
      } else {
        next();
      }
    });
  };
}

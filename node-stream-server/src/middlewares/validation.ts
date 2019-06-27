import Joi from 'joi';

import { Response, NextFunction } from 'express';
import { IVerifiedRequest } from './verifyToken';
import { handleErrorObjet } from '../utils/error';

export default function validationMiddleware(schema: Joi.SchemaLike) {
  return function(request: IVerifiedRequest, response: Response, next: NextFunction) {
    const { body } = request;

    Joi.validate(body, schema, (err, value) => {
      if (err) {
        response.status(422).send({
          errorMessage: handleErrorObjet(err),
        });
      } else {
        response.json({
          status: 'success',
        });
      }
    });
  };
}

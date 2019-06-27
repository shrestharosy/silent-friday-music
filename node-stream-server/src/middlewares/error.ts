import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export function errorHandler(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    // return next(err);
  }
  res.status(500).send({
    message: err,
  });
  //   res.render('error', { error: err });
}

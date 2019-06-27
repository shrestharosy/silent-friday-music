import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

interface IErrorRequest extends ErrorRequestHandler {
  error: {
    status: number;
    message: string;
  };
}

export function errorHandler(err: IErrorRequest, req: Request, res: Response, next: NextFunction) {
  if (err.error.status) {
    const { status, message } = err.error;
    res.status(status).send({
      message,
    });
  } else {
    res.status(500).send({
      message: err,
    });
  }
}

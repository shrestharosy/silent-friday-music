import { Request, Response, response } from 'express';

export interface IResponseRequest extends Request {
  response?: {
    payload: Object;
  };
}

export default function responseMiddleware(req: IResponseRequest, res: Response) {
  if (req.response && req.response) {
    const { payload } = req.response;
    res.json(payload);
  } else {
    res.send();
  }
}

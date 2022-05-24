import { NextFunction, Request, Response } from 'express';
import ApiError from './ApiError';

export default (err: any, req: Request, res: Response, _: NextFunction) => {
  let status = 500;
  let msg = '';
  console.log(`err`, err);
  // Api error
  if (err instanceof ApiError) {
    msg = req.__(err.message);
    status = err.status;
  } else {
    msg = req.__('errorMsg.serverError');
    if (err.name === 'CastError') {
      msg = err.message;
    }
    if (['JsonWebTokenError', 'TokenExpiredError', 'UnauthorizedError'].includes(err.name)) {
      msg = req.__('user.authorization');
      status = err.status ?? 401;
    }
    // if (err.errors) {
    //   status = 400;
    //   let errors = Object.values(err.errors).map((el: any) => el.message);
    //   msg += errors.join('.');
    // } else {
    // }
  }
  return res.status(status).json({ status, message: msg, err });
};

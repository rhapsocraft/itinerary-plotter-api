import { RequestHandler, Request, Response, NextFunction } from 'express';

export function asyncHandler<T extends RequestHandler<any, any, any, any, any>>(fn: T) {
  return (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);
}

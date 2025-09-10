import { RequestHandler } from 'express';

export function authGuard(): RequestHandler {
  return async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return (res.status(401).statusMessage = 'Unauthorized');
    }

    next();
  };
}

import { RequestHandler } from 'express';
import session from 'express-session';
import { env } from '@/config/environment';

export function sessionMiddleware(): RequestHandler {
  return session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  });
}

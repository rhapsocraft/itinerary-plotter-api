import { RequestHandler } from 'express';
import session from 'express-session';
import sessionConnector from 'connect-pg-simple';
import { env } from '@/config/environment';

export function sessionMiddleware(): RequestHandler {
  return session({
    store: new (sessionConnector(session))({
      tableName: 'user_sessions',
      conString: env.DATABASE_URL,
      createTableIfMissing: true,
    }),
    cookie: {
      maxAge: 86_400_000,
    },
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  });
}

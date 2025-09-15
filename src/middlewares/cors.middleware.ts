import { env } from '@/config/environment';
import cors, { CorsOptions } from 'cors';

export function corsMiddleware() {
  const whitelist: Array<string | RegExp> = [];

  if (!env.isProduction) {
    whitelist.push(/localhost/);
  }

  const corsOptions: CorsOptions = {
    origin: whitelist,
    allowedHeaders: ['content-type'],
    credentials: true,
  };

  return cors(corsOptions);
}

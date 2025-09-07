import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config({
  quiet: true,
});

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

const environmentSchema = z.object({
  SERVER_PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.url().nonempty(),
  SESSION_SECRET: z.string().nonempty(),
  GOOGLE_CLIENT_ID: z.string().nonempty(),
  GOOGLE_CLIENT_SECRET: z.string().nonempty(),
  GOOGLE_AUTH_CALLBACK_URL: z.url().default('/'),
});

type EnvironmentConfig = z.infer<typeof environmentSchema> & {
  isProduction: boolean;
};

export const env: EnvironmentConfig = {
  ...environmentSchema.parse(process.env),

  get isProduction() {
    return isProduction();
  },
};

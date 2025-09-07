import pg from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import type { DB } from './types.js';
import { env } from '@/config/environment.js';

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new pg.Pool({
      connectionString: env.DATABASE_URL,
    }),
  }),
});

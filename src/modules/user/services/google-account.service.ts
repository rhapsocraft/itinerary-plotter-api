import { db } from '@/db';
import { GoogleAccount } from '@/db/types';
import { Selectable } from 'kysely';

export async function findById(googleId: string): Promise<Selectable<GoogleAccount> | undefined> {
  return await db.selectFrom('google_accounts').selectAll().where('id', '=', googleId).executeTakeFirst();
}

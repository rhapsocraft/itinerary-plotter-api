import { db } from '@/db';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { Profile } from 'passport-google-oauth20';

const profileSchema = z.object({
  id: z.string().nonempty(),
  displayName: z.string().nonempty(),
  _json: z.object({
    email: z.email().nonempty(),
  }),
});

export async function registerGoogleUserUseCase(googleProfile: Profile) {
  const {
    id: googleId,
    displayName,
    _json: { email },
  } = profileSchema.parse(googleProfile);

  return await db.transaction().execute(async (trx) => {
    const updatedAt = new Date();

    const user = await trx
      .insertInto('users')
      .values({
        id: uuidv4(),
        displayName,
        updatedAt,
      })
      .returning('id')
      .executeTakeFirst();

    if (!user) {
      throw new Error('Unable to create user');
    }

    return await trx
      .insertInto('google_accounts')
      .values({
        id: googleId,
        email: email || '',
        userId: user?.id,
        updatedAt,
      })
      .returningAll()
      .executeTakeFirst();
  });
}

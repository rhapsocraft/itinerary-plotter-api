import { db } from '@/db';
import { ActivitySchema } from '@/db/generated/zod';
import { Activity } from '@/db/types';
import { createDTO } from '@/utils/create-dto.util';
import { Expression, Selectable, SqlBool } from 'kysely';
import z from 'zod';
import { v4 as uuidv4 } from 'uuid';

const { dto: createActivityDTO, validator: validateCreateActivityDTO } = createDTO(
  z.object({
    displayName: ActivitySchema.shape.displayName,
    tripId: ActivitySchema.shape.tripId,
  }),
);

export type CreateActivityDTO = typeof createActivityDTO;

export async function create(activityDTO: CreateActivityDTO): Promise<Selectable<Activity>> {
  const { displayName, tripId } = await validateCreateActivityDTO(activityDTO);

  const activity = await db
    .insertInto('activities')
    .values({
      id: uuidv4(),
      displayName,
      tripId,
      updatedAt: new Date(),
    })
    .returningAll()
    .executeTakeFirst();

  if (!activity) {
    throw new Error('Failed to create Activity');
  }

  return activity;
}

const { dto: findActivitiesDTO, validator: validateFindActivitiesDTO } = createDTO(
  z.object({
    id: ActivitySchema.shape.displayName.optional(),
    displayName: ActivitySchema.shape.displayName.optional(),
    tripId: ActivitySchema.shape.tripId.optional(),
  }),
);

export type FindActivitiesDTO = typeof findActivitiesDTO;

export async function findAll(params: FindActivitiesDTO) {
  const { id, displayName, tripId } = await validateFindActivitiesDTO(params);

  const activities = await db
    .selectFrom('activities')
    .where((eb) => {
      const ands: Expression<SqlBool>[] = [];

      if (id) ands.push(eb('id', '=', id));
      if (displayName) ands.push(eb('displayName', '=', displayName));
      if (tripId) ands.push(eb('tripId', '=', tripId));

      return eb.and(ands);
    })
    .selectAll()
    .execute();

  return activities;
}

export async function findById(id: string) {
  const activity = await db.selectFrom('activities').where('id', '=', id).selectAll().executeTakeFirst();

  if (!activity) {
    throw new Error(`Activity ${id} not found`);
  }

  return activity;
}

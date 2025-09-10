import { db } from '@/db';
import { TripSchema } from '@/db/schema';
import z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { createDTO } from '@/utils/create-dto.util';

const { dto: createTripDTO, validator: validateCreateTripDTO } = createDTO(
  z.object({
    displayName: TripSchema.shape.displayName,
    ownerId: TripSchema.shape.ownerId,
  }),
);

export type CreateTripDTO = typeof createTripDTO;

export async function create(tripDTO: CreateTripDTO) {
  const { displayName, ownerId } = await validateCreateTripDTO(tripDTO);

  const trip = await db
    .insertInto('trips')
    .values({
      id: uuidv4(),
      displayName,
      ownerId,
      updatedAt: new Date(),
    })
    .returningAll()
    .executeTakeFirst();

  if (!trip) {
    return new Error('Failed to create Trip');
  }

  return { trip };
}

export async function findById(id: string) {
  const trip = await db.selectFrom('trips').selectAll().where('id', '=', id).executeTakeFirst();

  if (!trip) {
    return new Error(`Trip ${id} not found`);
  }

  return trip;
}

import { db } from '@/db';
import { TripSchema } from '@/db/schema';
import z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { createDTO } from '@/utils/create-dto.util';
import { Trip } from '@/db/types';
import { Expression, Selectable, SqlBool } from 'kysely';

const { dto: createTripDTO, validator: validateCreateTripDTO } = createDTO(
  z.object({
    displayName: TripSchema.shape.displayName,
    ownerId: TripSchema.shape.ownerId,
  }),
);

export type CreateTripDTO = typeof createTripDTO;

export async function create(tripDTO: CreateTripDTO): Promise<{ trip: Selectable<Trip> }> {
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
    throw new Error('Failed to create Trip');
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

const { dto: findTripsDTO, validator: validateFindTripsDTO } = createDTO(
  z.object({
    id: TripSchema.shape.id.optional(),
    displayName: TripSchema.shape.displayName.optional(),
    ownerId: TripSchema.shape.ownerId.optional(),
  }),
);

export type FindTripsDTO = typeof findTripsDTO;

export async function find(parameters: FindTripsDTO) {
  const { id, displayName, ownerId } = await validateFindTripsDTO(findTripsDTO);

  const trips = await db
    .selectFrom('trips')
    .where((eb) => {
      const ands: Expression<SqlBool>[] = [];

      if (id) ands.push(eb('id', '=', id));
      if (displayName) ands.push(eb('displayName', '=', displayName));
      if (ownerId) ands.push(eb('ownerId', '=', ownerId));

      return eb.and(ands);
    })
    .selectAll()
    .execute();

  return trips;
}

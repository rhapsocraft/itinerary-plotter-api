import { db } from '@/db';
import z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { createDTO } from '@/utils/create-dto.util';
import { Trip } from '@/db/types';
import { Expression, Selectable, SqlBool } from 'kysely';
import { TripSchema } from '@/db/generated/zod';
import { GoogleMapsPlace } from '@/db/custom/place.schema';

const { dto: createTripDTO, validator: validateCreateTripDTO } = createDTO(
  z.object({
    displayName: TripSchema.shape.displayName,
    ownerId: TripSchema.shape.ownerId,
    centralLocation: GoogleMapsPlace.optional(),
  }),
);

export type CreateTripDTO = typeof createTripDTO;

export async function create(tripDTO: CreateTripDTO): Promise<Selectable<Trip>> {
  const { displayName, ownerId, centralLocation } = await validateCreateTripDTO(tripDTO);

  const trip = await db
    .insertInto('trips')
    .values({
      id: uuidv4(),
      displayName,
      centralLocation: centralLocation ? JSON.stringify(centralLocation) : undefined,
      ownerId,
      updatedAt: new Date(),
    })
    .returningAll()
    .executeTakeFirst();

  if (!trip) {
    throw new Error('Failed to create Trip');
  }

  return trip;
}

export async function findById(id: string) {
  const trip = await db.selectFrom('trips').selectAll().where('id', '=', id).executeTakeFirst();

  if (!trip) {
    throw new Error(`Trip ${id} not found`);
  }

  return trip;
}

export async function deleteById(id: string) {
  const trip = await db.deleteFrom('trips').where('id', '=', id).returningAll().executeTakeFirst();

  if (!trip) {
    throw new Error(`Trip ${id} not found`);
  }

  return trip;
}

const { dto: editTripDTO, validator: validateEditTripDTO } = createDTO(
  z.object({
    displayName: TripSchema.shape.displayName.optional(),
    ownerId: TripSchema.shape.ownerId.optional(),
    centralLocation: GoogleMapsPlace.optional(),
  }),
);

export type EditTripDTO = typeof editTripDTO;

export async function editById(id: string, editDto: EditTripDTO) {
  const { displayName, ownerId, centralLocation } = await validateEditTripDTO(editDto);

  const trip = await db
    .updateTable('trips')
    .where('id', '=', id)
    .set({
      displayName,
      centralLocation: centralLocation ? JSON.stringify(centralLocation) : undefined,
      ownerId,
      updatedAt: new Date(),
    })
    .returningAll()
    .executeTakeFirst();

  if (!trip) {
    throw new Error(`Trip ${id} not found`);
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

export async function findAll(params: FindTripsDTO) {
  const { id, displayName, ownerId } = await validateFindTripsDTO(params);

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

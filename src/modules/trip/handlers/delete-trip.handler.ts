import { RequestHandler } from 'express';
import { deleteById } from '../services/trip.service';
import { Trip } from '@/db/types';
import { Selectable } from 'kysely';

type DeleteTripResponse = Selectable<Trip>;

export const deleteTripHandler: RequestHandler<{ id: string }, DeleteTripResponse, any, any> = async (req, res) => {
  const deletedTrip = await deleteById(req.params.id);

  res.status(200).send(deletedTrip);
};

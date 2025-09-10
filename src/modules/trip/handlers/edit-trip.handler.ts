import { Trip } from '@/db/types';
import { Selectable } from 'kysely';
import { editById } from '../services/trip.service';
import { RequestHandler } from 'express';

type EditTripRequest = {
  displayName: string;
};

type EditTripResponse = Selectable<Trip>;

export const editTripHandler: RequestHandler<{ id: string }, EditTripResponse, EditTripRequest, any> = async (req, res) => {
  const { displayName } = req.body;
  const editedTrip = await editById(req.params.id, { displayName });

  res.status(200).send(editedTrip);
};

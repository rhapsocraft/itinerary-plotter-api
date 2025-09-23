import { Trip } from '@/db/types';
import { Selectable } from 'kysely';
import { editById } from '../services/trip.service';
import { RequestHandler } from 'express';

type EditTripRequest = {
  displayName: string;
  centralLocation: any;
};

type EditTripResponse = Selectable<Trip>;

export const editTripHandler: RequestHandler<{ id: string }, EditTripResponse, EditTripRequest, any> = async (req, res) => {
  const { displayName, centralLocation } = req.body;
  const editedTrip = await editById(req.params.id, {
    displayName,
    centralLocation,
  });

  res.status(200).send(editedTrip);
};

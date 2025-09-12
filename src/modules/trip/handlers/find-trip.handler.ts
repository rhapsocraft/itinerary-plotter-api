import { RequestHandler } from 'express';
import { find, findById } from '../services/trip.service';
import { Trip } from '@/db/types';
import { Selectable } from 'kysely';

type FindTripsRequest = {
  id: string;
  name: string;
};

type FindTripResponse = Selectable<Trip>;

export const findTripsHandler: RequestHandler<any, FindTripResponse[], FindTripsRequest, any> = async (req, res) => {
  // Find Trips visible to logged in user
  const trips = await find({ id: req.body?.id, displayName: req.body?.name, ownerId: req.user.userId });

  res.status(200).send(trips);
};

export const findTripByIdHandler: RequestHandler<{ id: string }, FindTripResponse, any, any> = async (req, res) => {
  const trip = await findById(req.params.id);

  res.status(200).send(trip);
};

import { RequestHandler } from 'express';
import { find } from '../services/trip.service';
import { Trip } from '@/db/types';
import { Selectable } from 'kysely';

type FindTripRequest = {
  id: string;
  name: string;
};

type FindTripResponse = Selectable<Trip>[];

export const findTripsHandler: RequestHandler<any, FindTripResponse, FindTripRequest, any> = async (req, res) => {
  // Find Trips visible to logged in user
  const trips = await find({ id: req.body?.id, displayName: req.body?.name, ownerId: req.user.userId });

  res.status(200).send(trips);
};

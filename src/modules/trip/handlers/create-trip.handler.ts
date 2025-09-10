import { Trip } from '@/db/types';
import { RequestHandler } from 'express';
import { create } from '../services/trip.service';
import { Selectable } from 'kysely';

type CreateTripRequest = {
  tripName: string;
};

type CreateTripResponse = {
  trip: Selectable<Trip>;
};

export const createTripHandler: RequestHandler<any, CreateTripResponse, CreateTripRequest, any> = async (req, res) => {
  const createdTrip = await create({ displayName: req.body?.tripName, ownerId: req.user.userId });

  res.status(201).send(createdTrip);
};

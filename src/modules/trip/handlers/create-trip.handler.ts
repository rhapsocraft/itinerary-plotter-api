import { Trip } from '@/db/types';
import { RequestHandler } from 'express';
import { create } from '../services/trip.service';
import { Selectable } from 'kysely';

type CreateTripRequest = {
  displayName: string;
};

type CreateTripResponse = Selectable<Trip>;

export const createTripHandler: RequestHandler<any, CreateTripResponse, CreateTripRequest, any> = async (req, res) => {
  const { displayName } = req.body;
  const createdTrip = await create({ displayName, ownerId: req.user.userId });

  res.status(201).send(createdTrip);
};

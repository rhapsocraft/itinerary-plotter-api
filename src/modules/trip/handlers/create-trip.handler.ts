import { Trip } from '@/db/types';
import { RequestHandler } from 'express';
import { create } from '../services/trip.service';
import { Selectable } from 'kysely';
import { GoogleMapsPlace } from '@/db/custom/place.schema';

type CreateTripRequest = {
  displayName: string;
  centralLocation: any;
};

type CreateTripResponse = Selectable<Trip>;

export const createTripHandler: RequestHandler<any, CreateTripResponse, CreateTripRequest, any> = async (req, res) => {
  const { displayName, centralLocation } = req.body;
  const createdTrip = await create({
    displayName,
    centralLocation,
    ownerId: req.user.userId,
  });

  res.status(201).send(createdTrip);
};

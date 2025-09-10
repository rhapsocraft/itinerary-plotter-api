import { NativeUser, Trip } from '@/db/types';
import { RequestHandler } from 'express';

type CreateTripRequest = {
  tripName: string;
};

type CreateTripResponse = {
  trip: Trip;
};

export const createTripHandler: RequestHandler<any, CreateTripResponse, CreateTripRequest, any> = (req, res) => {
  const user = req.user;
};

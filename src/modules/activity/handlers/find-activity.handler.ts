import { RequestHandler } from 'express';
import { findAll, findById } from '../services/activity.service';
import { Activity } from '@/db/types';
import { Selectable } from 'kysely';

type FindActivitiesRequest = {
  id: string;
  name: string;
  tripId: string;
};

type FindActivityResponse = Selectable<Activity>;

export const findActivitiesHandler: RequestHandler<any, FindActivityResponse[], FindActivitiesRequest, any> = async (req, res) => {
  const activities = await findAll({ id: req.body?.id, displayName: req.body?.name, tripId: req.body?.tripId });

  res.status(200).send(activities);
};

export const findActivityById: RequestHandler<{ id: string }, FindActivityResponse, any, any> = async (req, res) => {
  const activity = await findById(req.params.id);

  res.status(200).send(activity);
};

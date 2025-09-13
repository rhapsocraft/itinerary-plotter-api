import { Activity } from '@/db/types';
import { findAll } from '@/modules/activity/services/activity.service';
import { RequestHandler } from 'express';
import { Selectable } from 'kysely';

type FindTripActivitiesRequest = {
  id: string;
  displayName: string;
};

type FindTripActivityResponse = Selectable<Activity>;

export const findTripActivitiesHandler: RequestHandler<{ id: string }, FindTripActivityResponse[], FindTripActivitiesRequest, any> = async (
  req,
  res,
) => {
  const activities = await findAll({ id: req.body?.id, displayName: req.body?.displayName, tripId: req.params.id });

  res.status(200).send(activities);
};

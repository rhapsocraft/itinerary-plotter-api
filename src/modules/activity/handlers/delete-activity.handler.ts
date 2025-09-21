import { Activity } from '@/db/types';
import { deleteById } from '@/modules/activity/services/activity.service';
import { RequestHandler } from 'express';
import { Selectable } from 'kysely';

type DeleteActivityRequest = {
  id: string;
};

type DeleteActivityResponse = Selectable<Activity>;

export const deleteActivityHandler: RequestHandler<{ id: string }, DeleteActivityResponse, DeleteActivityRequest, any> = async (
  req,
  res,
) => {
  const activity = await deleteById(req.params.id);

  res.status(200).send(activity);
};

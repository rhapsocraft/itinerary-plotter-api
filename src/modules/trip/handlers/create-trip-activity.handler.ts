import { Activity } from '@/db/types';
import { create as createActivity } from '@/modules/activity/services/activity.service';
import { RequestHandler } from 'express';
import { Selectable } from 'kysely';
import { findById } from '../services/trip.service';

type CreateActivityRequest = {
  displayName: string;
  scheduleStart: string;
  scheduleEnd: string;
};

type CreateActivityResponse = Selectable<Activity> | string;

export const createTripActivityHandler: RequestHandler<{ id: string }, CreateActivityResponse, CreateActivityRequest, any> = async (
  req,
  res,
) => {
  const tripId = req.params.id;
  const trip = await findById(tripId);

  if (trip) {
    if (trip.ownerId === req.user?.userId) {
      const { displayName, scheduleStart, scheduleEnd } = req.body;
      const createdActivity = await createActivity({
        displayName,
        tripId,
        scheduleStart: new Date(scheduleStart),
        ...(scheduleEnd && { scheduleEnd: new Date(scheduleEnd) }),
      });

      res.status(201).send(createdActivity);
    } else {
      res.status(403).send('Unauthorized operation');
    }
  } else {
    res.status(404).send(`Trip ${tripId} not found`);
  }
};

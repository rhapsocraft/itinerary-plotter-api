import { RequestHandler } from 'express';
import { findById } from '../services/trip.service';
import { Activity } from '@/db/types';
import { Selectable } from 'kysely';
import { deleteAll as deleteAllActivities } from '@/modules/activity/services/activity.service';

type DeleteTripActivitiesRequest = {
  id: string;
  displayName: string;
};

type DeleteTripActivitiesResponse = Selectable<Activity>;

export const deleteTripActivitiesHandler: RequestHandler<
  { id: string },
  DeleteTripActivitiesResponse[] | string,
  DeleteTripActivitiesRequest,
  any
> = async (req, res) => {
  const tripId = req.params.id;
  const trip = await findById(tripId);

  if (trip) {
    if (trip.ownerId === req.user.userId) {
      const deletedActivities = await deleteAllActivities({ id: req.body?.id, displayName: req.body?.displayName, tripId });

      res.status(200).send(deletedActivities);
    } else {
      res.status(403).send('Unauthorized operation');
    }
  } else {
    res.status(404).send(`Trip ${tripId} not found`);
  }
};

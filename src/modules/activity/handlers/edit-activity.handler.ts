import { Activity } from '@/db/types';
import { Selectable } from 'kysely';
import { RequestHandler } from 'express';
import { editById } from '@/modules/activity/services/activity.service';

type EditActivityRequest = {
  displayName: string;
  description: string;
  scheduleStart: string;
  scheduleEnd: string;
  locations: any;
};

type EditActivityResponse = Selectable<Activity> | string;

export const editActivityHandler: RequestHandler<{ id: string }, EditActivityResponse, EditActivityRequest, any> = async (req, res) => {
  const { userId } = req.user;

  if (userId) {
    const { displayName, description, scheduleStart, scheduleEnd, locations } = req.body;
    const editedActivity = await editById(req.params.id, {
      displayName,
      description,
      ...(scheduleStart && { scheduleStart: new Date(scheduleStart) }),
      ...(scheduleEnd && { scheduleEnd: new Date(scheduleEnd) }),
      locations,
      userId,
    });

    res.status(200).send(editedActivity);
  }
};

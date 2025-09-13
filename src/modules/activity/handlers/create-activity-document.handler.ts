import { Document } from '@/db/types';
import { create as createDocument } from '@/modules/document/services/document.service';
import { RequestHandler } from 'express';
import { Selectable } from 'kysely';
import { findById } from '../services/activity.service';

type CreateActivityDocumentResponse = Selectable<Document> | string;

export const createActivityDocumentHandler: RequestHandler<{ id: string }, CreateActivityDocumentResponse, any, any> = async (req, res) => {
  const activityId = req.params.id;
  const activity = await findById(activityId);

  if (activity) {
    const createdDocument = await createDocument({ activityId });

    res.status(201).send(createdDocument);
  } else {
    res.status(404).send(`Activity ${activityId} not found`);
  }
};

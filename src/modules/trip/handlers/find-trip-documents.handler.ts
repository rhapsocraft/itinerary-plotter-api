import { Document } from '@/db/types';
import { findAll } from '@/modules/document/services/document.service';
import { RequestHandler } from 'express';
import { Selectable } from 'kysely';

type FindDocumentResponse = Selectable<Document>;

export const findTripDocumentsHandler: RequestHandler<{ id: string }, FindDocumentResponse[], any, any> = async (req, res) => {
  // Find Trips visible to logged in user
  const documents = await findAll({ tripId: req.body?.id });

  res.status(200).send(documents);
};

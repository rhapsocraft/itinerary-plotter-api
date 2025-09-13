import { Document } from '@/db/types';
import { findAll } from '@/modules/document/services/document.service';
import { RequestHandler } from 'express';
import { Selectable } from 'kysely';

type FindTripDocumentsRequest = {
  id: string;
};

type FindDocumentResponse = Selectable<Document>;

export const findTripDocumentsHandler: RequestHandler<{ id: string }, FindDocumentResponse[], FindTripDocumentsRequest, any> = async (
  req,
  res,
) => {
  const documents = await findAll({ id: req.body?.id, tripId: req.params.id });

  res.status(200).send(documents);
};

import { Document } from '@/db/types';
import { findAll as findAllDocuments } from '@/modules/document/services/document.service';
import { RequestHandler } from 'express';
import { Selectable } from 'kysely';

type FindTripDocumentsRequest = {
  id: string;
};

type FindTripDocumentResponse = Selectable<Document>;

export const findTripDocumentsHandler: RequestHandler<{ id: string }, FindTripDocumentResponse[], FindTripDocumentsRequest, any> = async (
  req,
  res,
) => {
  const documents = await findAllDocuments({ id: req.body?.id, tripId: req.params.id });

  res.status(200).send(documents);
};

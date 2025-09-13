import { Document } from '@/db/types';
import { findAll as findAllDocuments } from '@/modules/document/services/document.service';
import { RequestHandler } from 'express';
import { Selectable } from 'kysely';

type FindActivityDocumentsRequest = {
  id: string;
};

type FindActivityDocumentResponse = Selectable<Document>;

export const findActivityDocumentsHandler: RequestHandler<
  { id: string },
  FindActivityDocumentResponse[],
  FindActivityDocumentsRequest,
  any
> = async (req, res) => {
  const documents = await findAllDocuments({ id: req.body?.id, activityId: req.params.id });

  res.status(200).send(documents);
};

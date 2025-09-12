import { Document } from '@/db/types';
import { create as createDocument } from '@/modules/document/services/document.service';
import { RequestHandler } from 'express';
import { Selectable } from 'kysely';

type CreateDocumentResponse = Selectable<Document>;

export const createTripDocumentHandler: RequestHandler<{ id: string }, CreateDocumentResponse, any, any> = async (req, res) => {
  const createdDocument = await createDocument({ tripId: req.params.id });

  res.status(201).send(createdDocument);
};

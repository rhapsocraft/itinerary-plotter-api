import { Document } from '@/db/types';
import { Selectable } from 'kysely';
import { editById } from '../services/document.service';
import { RequestHandler } from 'express';

type EditDocumentRequest = {
  content: string;
};

type EditDocumentResponse = Selectable<Document>;

export const editDocumentHandler: RequestHandler<{ id: string }, EditDocumentResponse, EditDocumentRequest, any> = async (req, res) => {
  const { content } = req.body;
  const editedDocument = await editById(req.params.id, { content });

  res.status(200).send(editedDocument);
};

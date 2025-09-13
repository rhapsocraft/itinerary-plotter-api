import { Document } from '@/db/types';
import { create as createDocument } from '@/modules/document/services/document.service';
import { RequestHandler } from 'express';
import { Selectable } from 'kysely';
import { findById } from '../services/trip.service';

type CreateTripDocumentResponse = Selectable<Document> | string;

export const createTripDocumentHandler: RequestHandler<{ id: string }, CreateTripDocumentResponse, any, any> = async (req, res) => {
  const tripId = req.params.id;
  const trip = await findById(tripId);

  if (trip) {
    const createdDocument = await createDocument({ tripId });

    res.status(201).send(createdDocument);
  } else {
    res.status(404).send(`Trip ${tripId} not found`);
  }
};

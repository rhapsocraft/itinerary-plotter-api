import { db } from '@/db';
import { DocumentSchema } from '@/db/generated/zod';
import { Document } from '@/db/types';
import { createDTO } from '@/utils/create-dto.util';
import { Expression, Selectable, SqlBool } from 'kysely';
import { v4 as uuidv4 } from 'uuid';
import z from 'zod';

const { dto: createDocumentDTO, validator: validateCreateDocumentDTO } = createDTO(
  z.object({
    tripId: DocumentSchema.shape.tripId,
    content: DocumentSchema.shape.content.optional(),
  }),
);

export type CreateDocumentDTO = typeof createDocumentDTO;

export async function create(documentDTO: CreateDocumentDTO): Promise<Selectable<Document>> {
  const { tripId, content } = await validateCreateDocumentDTO(documentDTO);

  const document = await db
    .insertInto('documents')
    .values({
      id: uuidv4(),
      tripId,
      content,
      updatedAt: new Date(),
    })
    .returningAll()
    .executeTakeFirst();

  if (!document) {
    throw new Error(`Failed to create Document in Trip: ${tripId}`);
  }

  return document;
}

const { dto: findDocumentDTO, validator: validateFindDocumentDTO } = createDTO(
  z.object({
    id: DocumentSchema.shape.id.optional(),
    tripId: DocumentSchema.shape.tripId.optional(),
  }),
);

export type FindDocumentDTO = typeof findDocumentDTO;

export async function findAll(params: FindDocumentDTO) {
  const { id, tripId } = await validateFindDocumentDTO(params);

  const documents = await db
    .selectFrom('documents')
    .where((eb) => {
      const ands: Expression<SqlBool>[] = [];

      if (id) ands.push(eb('id', '=', id));
      if (tripId) ands.push(eb('id', '=', tripId));

      return eb.and(ands);
    })
    .selectAll()
    .execute();

  return documents;
}

const { dto: editDocumentDTO, validator: validateEditDocumentDTO } = createDTO(
  z.object({
    content: DocumentSchema.shape.content.optional(),
    tripId: DocumentSchema.shape.tripId.optional(),
  }),
);

export type EditDocumentDTO = typeof editDocumentDTO;

export async function editById(id: string, editDto: EditDocumentDTO) {
  const { content, tripId } = await validateEditDocumentDTO(editDto);

  const document = await db
    .updateTable('documents')
    .where('id', '=', id)
    .set({
      content,
      tripId,
    })
    .returningAll()
    .executeTakeFirst();

  if (!document) {
    throw new Error(`Document ${id} not found`);
  }

  return document;
}

export async function deleteById(id: string): Promise<Selectable<Document>> {
  const document = await db.deleteFrom('documents').where('id', '=', id).returningAll().executeTakeFirst();

  if (!document) {
    throw new Error(`Document ${id} not found`);
  }

  return document;
}

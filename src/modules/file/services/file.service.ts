import { db } from '@/db';
import { FileSchema } from '@/db/generated/zod';
import { createDTO } from '@/utils/create-dto.util';
import z from 'zod';
import { DB } from '@/db/types';
import { Expression, ExpressionBuilder, ExpressionOrFactory, SqlBool } from 'kysely';

const { dto: findFilesDTO, validator: validateFindFilesDTO } = createDTO(
  z.object({
    id: FileSchema.shape.id.optional(),
    name: FileSchema.shape.name.optional(),
    uploaderId: FileSchema.shape.uploaderId.optional(),
    type: FileSchema.shape.type.optional(),
  }),
);

export type FindFilesDTO = typeof findFilesDTO;

async function getFileParams(params: FindFilesDTO): Promise<ExpressionOrFactory<DB, 'files', SqlBool>> {
  const { id, name, uploaderId, type } = await validateFindFilesDTO(params);

  return function (eb: ExpressionBuilder<DB, 'files'>) {
    const ands: Expression<SqlBool>[] = [];

    if (id) ands.push(eb('id', '=', id));
    if (name) ands.push(eb('name', '=', name));
    if (uploaderId) ands.push(eb('uploaderId', '=', uploaderId));
    if (type) ands.push(eb('type', '=', type));

    return eb.and(ands);
  };
}

export async function findAll(params: FindFilesDTO) {
  return await db
    .selectFrom('files')
    .where(await getFileParams(params))
    .selectAll()
    .execute();
}

export async function findById(id: string) {
  const file = await db.selectFrom('files').where('id', '=', id).selectAll().executeTakeFirst();

  if (!file) {
    throw new Error(`File ${id} not found`);
  }

  return file;
}

export async function deleteAll(params: FindFilesDTO) {
  return await db
    .deleteFrom('files')
    .where(await getFileParams(params))
    .returningAll()
    .execute();
}

export async function deleteById(id: string) {
  const file = await db.deleteFrom('files').where('id', '=', id).returningAll().executeTakeFirst();

  if (!file) {
    throw new Error(`File ${id} not found`);
  }

  return file;
}

import { db } from '@/db';
import { FileSchema } from '@/db/generated/zod';
import { File } from '@/db/types';
import { createDTO } from '@/utils/create-dto.util';
import { v4 as uuidv4 } from 'uuid';
import z from 'zod';

export const { dto: createDocumentFileDTO, validator: validateCreateDocumentFileDTO } = createDTO(
  z.object({
    name: FileSchema.shape.name,
    displayName: FileSchema.shape.displayName.optional(),
    type: FileSchema.shape.type,
    size: FileSchema.shape.size,
    src: FileSchema.shape.src,
    uploaderId: FileSchema.shape.uploaderId,
  }),
);

export type CreateDocumentFileDTO = typeof createDocumentFileDTO;

function fileToDTO(file: Express.Multer.File, uploaderId: string): CreateDocumentFileDTO {
  return {
    displayName: file.originalname,
    name: file.filename,
    size: file.size,
    src: file.path,
    type: file.mimetype,
    uploaderId,
  };
}

export async function uploadDocumentFilesUseCase(documentId: string, filesToUpload: Express.Multer.File[], userId: string) {
  const fileDTOs = filesToUpload.map((file) => fileToDTO(file, userId));

  return await db.transaction().execute(async (trx) => {
    const createdDocumentFiles: Partial<File>[] = [];

    const document = await db.selectFrom('documents').select('id').where('id', '=', documentId).executeTakeFirst();

    if (!document) {
      throw new Error(`Document ${documentId} not found`);
    }

    for (const file of fileDTOs) {
      const { name, displayName, type, size, src, uploaderId } = await validateCreateDocumentFileDTO(file);

      const createdFile = await trx
        .insertInto('files')
        .values({
          id: uuidv4(),
          displayName: displayName ?? name,
          name,
          type,
          size,
          src,
          uploaderId,
          updatedAt: new Date(),
        })
        .returning(['id', 'name', 'src'])
        .executeTakeFirst();

      if (!createdFile) {
        throw new Error(`Unable to create file: ${displayName ?? name}`);
      }

      const createdDocumentFile = await trx
        .insertInto('document_file_ref')
        .values({
          documentId,
          fileId: createdFile.id,
        })
        .returningAll()
        .executeTakeFirst();

      if (!createdDocumentFile) {
        throw new Error(`Unable to create document file reference: ${documentId}`);
      }

      createdDocumentFiles.push(createdFile);
    }

    return createdDocumentFiles;
  });
}

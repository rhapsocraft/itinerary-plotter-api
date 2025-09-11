import { db } from '@/db';
import { FileSchema } from '@/db/generated/zod';
import { createDTO } from '@/utils/create-dto.util';
import z from 'zod';

const { dto: createFileDTO } = createDTO(
  z.object({
    name: FileSchema.shape.name,
  }),
);

export type CreateFileDTO = z.infer<typeof createFileDTO>;

export function batchCreateFiles(files: CreateFileDTO[]) {
  db.transaction((trx) => {});
}

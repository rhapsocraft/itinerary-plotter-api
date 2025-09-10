import z, { ZodObject, ZodType } from 'zod';
import { createSchemaValidator } from './create-schema-validator.util';

export function createDTO<T extends ZodObject>(dtoSchema: T) {
  const dto = dtoSchema as z.infer<T>;
  return { dto, validator: createSchemaValidator(dtoSchema) };
}

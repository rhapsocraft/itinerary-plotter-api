import z, { ZodError, ZodType } from 'zod';

function assertIsZodError<T = any>(err: any): asserts err is ZodError<T> {
  if (!(err instanceof ZodError)) {
    throw err;
  }
}

export function createSchemaValidator(schema: ZodType) {
  return async <T extends Record<string, any>>(data: T): Promise<T> => {
    try {
      return schema.parse(data) as T;
    } catch (err) {
      assertIsZodError(err);

      throw new Error(`Validation failed:, ${z.treeifyError(err).errors.toString()}`);
    }
  };
}

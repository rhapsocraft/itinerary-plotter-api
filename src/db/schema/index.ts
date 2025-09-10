import z from 'zod';

const timestamps = z.object({ createdAt: z.iso.datetime(), updatedAt: z.iso.datetime() });

export const TripSchema = z
  .object({
    id: z.uuid(),
    displayName: z.string(),
    ownerId: z.uuid(),
  })
  .extend(timestamps.shape);

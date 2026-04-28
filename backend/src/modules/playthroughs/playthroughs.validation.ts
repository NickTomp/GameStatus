import { z } from "zod";

export const createPlaythroughSchema = z.object({
  gameId: z.uuid(),

  playedAt: z.iso.datetime(),

  hoursSpent: z.number().min(1),

  review: z.string().max(1000).optional(),
});
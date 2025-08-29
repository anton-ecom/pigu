// app/schemas/groupJoinSchema.ts

import { z } from "zod";

export const WaitingListSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
});

export type WaitingListFormInput = z.infer<typeof WaitingListSchema>;

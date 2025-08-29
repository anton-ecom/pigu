// app/schemas/groupJoinSchema.ts

import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.string().email("Valid email required"),
});

export type subscribeSchemaFormInput = z.infer<typeof subscribeSchema>;

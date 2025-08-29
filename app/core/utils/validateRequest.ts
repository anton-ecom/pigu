import type { ZodSchema } from "zod";
import { WError } from "@core/utils/WError";

export async function validateRequest<T>(
  schema: ZodSchema<T>,
  data: unknown,
  context: Record<string, unknown>,
): Promise<T> {
  try {
    return schema.parse(data);
  } catch (error) {
    throw new WError(
      {
        name: "ValidationError",
        cause: error,
        info: { context },
      },
      "Schema validation failed",
    );
  }
}

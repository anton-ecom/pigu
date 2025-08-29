import { ZodError, ZodIssue, ZodInvalidTypeIssue } from "zod";

//https://github.com/enormora/schema-hub/tree/main/source/zod-error-formatter

export type ZodFormattedError = {
  path: string;
  message: string;
  code: string;
  expected?: string | number | boolean; // Optional: only for specific issue types
  received?: string | number | boolean; // Optional: only for specific issue types
};

export function formatZodError(error: ZodError): ZodFormattedError[] {
  return error.issues.map((issue: ZodIssue) => {
    // Narrow the type to handle expected/received properties
    const { path, message, code } = issue;
    let expected: string | number | boolean | undefined;
    let received: string | number | boolean | undefined;

    if ("expected" in issue && "received" in issue) {
      // Type narrowing for ZodInvalidTypeIssue
      expected = String((issue as ZodInvalidTypeIssue).expected);
      received = String((issue as ZodInvalidTypeIssue).received);
    }

    return {
      path: path.join(" > "),
      message,
      code,
      expected,
      received,
    };
  });
}

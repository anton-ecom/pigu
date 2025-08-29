import type { ZodError } from "zod";
import { formatZodError } from "~/utils/zod-formatter";

export class WError extends Error {
  cause?: Error;
  info?: Record<string, unknown>;

  constructor(
    options:
      | {
          name: string;
          info?: Record<string, unknown>;
          cause?: unknown;
        }
      | string, // Allow either options or message as the first argument
    message?: string, // Optional message when options are provided
  ) {
    if (typeof options === "string") {
      // If the first argument is a string, treat it as the message
      super(options);
      this.name = "Error"; // Default name
    } else {
      // If the first argument is an object, extract properties
      super(message || "An error occurred");
      this.name = options.name;
      this.info = options.info;
      this.cause = options.cause instanceof Error ? options.cause : undefined;
    }

    Object.setPrototypeOf(this, new.target.prototype);
  }

  /**
   * Recursively collect all informational context.
   */
  static info(error: WError): Record<string, unknown> {
    const aggregatedInfo: Record<string, unknown> = {};
    let currentError: WError | undefined = error;

    while (currentError instanceof WError) {
      if (currentError.info) {
        Object.assign(aggregatedInfo, currentError.info);
      }
      currentError = currentError.cause as WError;
    }

    return aggregatedInfo;
  }

  /**
   * Return the direct cause of this error, if any.
   * (verror-compatible)
   */
  static cause(error: WError): Error | undefined {
    return error.cause;
  }

  /**
   * Recursively construct the full stack trace, including causes.
   */
  static fullStack(error: unknown): string {
    if (error instanceof MultiError) {
      let stack = `${error.name}: ${error.message}`;
      let currentCause = error.cause;

      while (currentCause) {
        if (currentCause instanceof WError) {
          stack += `\nCaused by: ${currentCause.stack || currentCause.message}`;
          currentCause = currentCause.cause;
        } else if (currentCause instanceof Error) {
          stack += `\nCaused by: ${currentCause.stack || currentCause.message}`;
          break; // Stop traversing as this isn't a WError
        } else {
          stack += `\nCaused by: ${JSON.stringify(currentCause)}`;
          break; // Stop traversal as it's an unknown, non-error object
        }
      }

      return stack;
    }

    throw new WError(
      { name: "InvalidErrorType", info: { error } },
      "Attempted to output over a non-WError object",
    );
  }

  /**
   * Find a cause in the chain by its name.
   */
  static findCauseByName(error: unknown, name: string): Error | null {
    let currentError = error;

    while (currentError instanceof WError) {
      if (currentError.name === name) {
        return currentError;
      }
      currentError = currentError.cause;
    }

    return null;
  }

  /**
   * Determine whether the error chain contains a cause with the given name.
   */
  static hasCauseWithName(error: unknown, name: string): boolean {
    return WError.findCauseByName(error, name) !== null;
  }

  /**
   * Combine multiple errors into a single error or return null if no errors exist.
   */
  static errorFromList(errors: Error[]): Error | null {
    if (errors.length === 0) return null;
    if (errors.length === 1) return errors[0];

    return new MultiError(errors);
  }

  /**
   * Iterate over errors, supporting MultiError.
   */
  static errorForEach(error: unknown, func: (error: Error) => void): void {
    if (error instanceof MultiError) {
      for (const err of error.errors) {
        func(err);
      }
    } else if (error instanceof Error) {
      func(error);
    } else {
      // Optionally handle non-Error cases
      throw new WError(
        { name: "InvalidErrorType", info: { error } },
        "Attempted to iterate over a non-Error object",
      );
    }
  }

  static infoFlat(error: WError): string {
    const info = WError.info(error);
    return JSON.stringify(info, null, 2);
  }

  static fullDetails(error: WError): string {
    const info = WError.infoFlat(error);
    const stack = WError.fullStack(error);
    return `Error Info:\n${info}\n\nFull Stack Trace:\n${stack}`;
  }

  static z(zodError: ZodError, name: string, message?: string): WError {
    return new WError(
      {
        name,
        info: { validationErrors: formatZodError(zodError) },
      },
      message || "Validation error",
    );
  }
}

/**
 * Represents a collection of errors.
 */
export class MultiError extends WError {
  errors: Error[];

  constructor(errors: Error[]) {
    super(
      {
        name: "MultiError",
        info: { errorCount: errors.length },
      },
      `${errors.length} errors occurred`,
    );
    this.errors = errors;
  }

  findErrorByName(name: string): Error | null {
    return this.errors.find((err) => err.name === name) || null;
  }
}

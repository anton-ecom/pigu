// src/utils/errors.ts

// Custom error class

export class ErrorWithContext extends Error {
  layer: "repository" | "service" | "component" | "api";
  context?: Record<string, any>;

  constructor(
    message: string,
    layer: "repository" | "service" | "component" | "api",
    context?: Record<string, any>,
  ) {
    super(message);
    this.layer = layer;
    this.context = context;

    // Ensure the name of the error is the class name
    this.name = "ErrorWithContext";

    // Fix the prototype chain (important for instanceof checks)
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// Define a factory function for convenience
export const CtxError = (
  message: string,
  layer: "repository" | "service" | "component" | "api",
  context?: Record<string, any>,
): ErrorWithContext => {
  return new ErrorWithContext(message, layer, context);
};

export function isDefinitelyAnError(error: unknown): error is Error {
  return (
    error instanceof Error ||
    (error instanceof Error && typeof error === "object" && "message" in error)
  );
}

export class WError extends Error {
  static info(error: WError): any {
    throw new Error("Method not implemented.");
  }
  cause?: Error;
  layer: string;
  context?: Record<string, any>;

  constructor(
    message: string,
    layer: "repository" | "service" | "component" | "api",
    cause?: Error,
    context?: Record<string, any>,
  ) {
    super(message);
    this.name = "WrappedError";
    this.layer = layer;
    this.cause = cause;
    this.context = context;

    // Fix the prototype chain (important for instanceof checks)
    Object.setPrototypeOf(this, new.target.prototype);
  }

  // Recursively collect all causes for debugging
  getFullStack(): string {
    let stack = this.stack || this.message;
    let currentCause = this.cause;

    while (currentCause) {
      stack += `\nCaused by: ${currentCause.stack || currentCause.message}`;
      currentCause =
        currentCause instanceof WError ? currentCause.cause : undefined;
    }

    return stack;
  }
}

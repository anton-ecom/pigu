import { isBrowser } from "./is-browser";
import { env } from "node:process";
declare global {
  interface Window {
    env: {
      SUPABASE_URL: string;
      SUPABASE_ANON_PUBLIC: string;
    };
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SUPABASE_URL: string;
      SUPABASE_SERVICE_ROLE: string;
      SERVER_URL: string;
      SUPABASE_ANON_PUBLIC: string;
      SESSION_SECRET: string;
    }
  }
}

type EnvOptions = {
  isSecret?: boolean;
  isRequired?: boolean;
};
function getEnv(
  name: string,
  { isRequired, isSecret }: EnvOptions = { isSecret: true, isRequired: true },
) {
  if (isBrowser && isSecret) return "";

  const source = (isBrowser ? window.env : env) ?? {};

  const value = source[name as keyof typeof source];

  if (!value && isRequired) {
    throw new Error(`${name} is not set`);
  }

  return value;
}

/**
 * Server env
 */
export const SERVER_URL = getEnv("SERVER_URL");
export const SUPABASE_SERVICE_ROLE = getEnv("SUPABASE_SERVICE_ROLE");
export const SESSION_SECRET = getEnv("SESSION_SECRET");

export const SMTP_HOST = getEnv("SMTP_HOST");
export const SMTP_PORT = getEnv("SMTP_PORT");
export const SMTP_USER = getEnv("SMTP_USER");
export const SMTP_PASS = getEnv("SMTP_PASS");
export const SMTP_FROM = getEnv("SMTP_FROM");
export const SMTP_FROM_NAME = getEnv("SMTP_FROM_NAME");
export const EMAIL_TO = getEnv("EMAIL_TO", {
  isRequired: false,
  isSecret: true,
});

export const APP_URL = getEnv("APP_URL", {
  isSecret: false,
});
export const TURNSTILE_KEY = getEnv("TURNSTILE_KEY", {
  isRequired: false,
  isSecret: false,
});

export const TURNSTILE_SECRET = getEnv("TURNSTILE_SECRET", {
  isRequired: false,
  isSecret: true,
});

/**
 * Shared envs
 */
export const NODE_ENV = getEnv("NODE_ENV", {
  isSecret: false,
  isRequired: false,
});
export const SUPABASE_URL = getEnv("SUPABASE_URL", { isSecret: false });
export const SUPABASE_ANON_PUBLIC = getEnv("SUPABASE_ANON_PUBLIC", {
  isSecret: false,
});

export function getBrowserEnv() {
  return {
    SUPABASE_URL,
    SUPABASE_ANON_PUBLIC,
  };
}

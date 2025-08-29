import { createCookie } from "react-router"; // or cloudflare/deno

export const userCookie = createCookie("user", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Only secure in production
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 1 week expiration
});

export const userId = createCookie("userId", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Only secure in production
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 1 week expiration
});

import { FlatCache } from "flat-cache";
import path from "node:path";

const cache = new FlatCache({
  ttl: 60 * 60 * 1000, // 1 hour
  lruSize: 10000, // 10,000 items
  expirationInterval: 5 * 1000 * 60, // 5 minutes
  persistInterval: 5 * 1000 * 60, // 5 minutes
  cacheDir: path.resolve("./.cache"), // Cache directory
});

export function getCache<T>(key: string): T | null {
  const cacheKey = cache.getKey(key) as T;
  return cacheKey || null;
}

export function setCache<T>(key: string, value: T) {
  cache.setKey(key, value);
  cache.save();
}

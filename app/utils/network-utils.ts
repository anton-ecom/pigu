export function getClientIP(request: Request): string | null {
  // Try all common IP header variations
  return (
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For")?.split(",")[0].trim() ||
    request.headers.get("X-Real-IP") ||
    request.headers.get("X-Client-IP") ||
    request.headers.get("Forwarded")?.match(/for=([^;]+)/)?.[1] ||
    null
  );
}

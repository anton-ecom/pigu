export function getUserToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("jwt");
  }
  return null;
}

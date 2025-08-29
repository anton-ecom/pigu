//import { CacheControl } from "@remix-run/node"; // Or any other caching utility

const API_ROUTES = {
  node: [
    "stats/stats", // Routes handled by the Node.js API
    "stats/sales",
  ],
  php: [
    "/legacy-path", // Routes handled by the PHP API
    "/another-php-endpoint",
  ],
};

const NODE_API_BASE_URL =
  process.env.VITE_NODE_API_URL || "http://localhost:3001/api/v1";
const PHP_API_BASE_URL = process.env.VITE_API_URL || "http://api.market.test";

//console.log(NODE_API_BASE_URL);

function getApiBaseUrl(path: string): string {
  if (API_ROUTES.node.some((route) => path.startsWith(route))) {
    return NODE_API_BASE_URL;
  }
  return PHP_API_BASE_URL;
}

export async function fetchFromApi(
  path: string,
  method: string,
  headers: Record<string, string> = {},
  params: Record<string, string> = {}, // Add query parameters
  payload?: { body: any; files: any[] },
): Promise<Response> {
  const baseUrl = getApiBaseUrl(path);

  const queryString = params
    ? Object.entries(params)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
        )
        .join("&")
    : "";

  const url = `${baseUrl}/${path}${queryString ? `?${queryString}` : ""}`;

  let body: any;

  if (payload) {
    const isMultipart = payload.files && payload.files.length > 0;
    if (isMultipart) {
      // Create a FormData object for files and fields
      body = new FormData();
      payload.files.forEach((file) =>
        body.append("files[]", file.data, file.name),
      );
      Object.entries(payload.body).forEach(([key, value]) =>
        body.append(key, value),
      );
    } else {
      // Send JSON payload
      body = JSON.stringify(payload.body);
      headers["Content-Type"] = "application/json";
    }
  }

  // const url = `${import.meta.env.VITE_API_BASE_URL_OLD}/${path}`;
  //const url = `${baseUrl}/${path}`;
  console.log("REAL API: " + url);
  console.log("METHOD: " + method);

  /* const options: RequestInit = {
    method,
    headers: {
      ...headers,
      Authorization: `Bearer ${process.env.VITE_API_KEY}`, // Static token for now  
    },

  }; */

  const fetchOptions: RequestInit = {
    method,
    headers: {
      ...headers,
      Authorization: `Bearer ${process.env.VITE_API_KEY}`, // Static token for now
    },
    body,
  };

  return fetch(url, fetchOptions);
}

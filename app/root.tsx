// app/root.tsx
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  data,
  isRouteErrorResponse,
  useLoaderData,
} from "react-router";

import { useEffect, useState } from "react";
import type { LinksFunction } from "react-router";
import appStyles from "./build/app.css?url";
import type { Route } from "./+types/root";
import { Link } from "react-router";
import LoadingBar from "~/components/LoadingBar";
import { ThemeContext } from "~/components/ThemeContext";

export async function loader() {
  const lng = "en"; // Default language
  return data({ lng });
}

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap",
  },
  { rel: "stylesheet", defer: true, href: appStyles },

  {
    href: "https://static.cloudflareinsights.com/beacon.min.js",
    rel: "preload",
    as: "script",
    "data-cf-beacon": JSON.stringify({
      token: "06ddc45bfb634b37ad1c018215ddd56e",
    }),
  },
];

export default function Root() {
  const { lng } = useLoaderData<typeof loader>();
  //  useChangeLanguage(lng);
  return (
    <Layout lang={lng}>
      <Outlet />
    </Layout>
  );
}

function Layout({
  children,
  lang = "en",
}: {
  children: React.ReactNode;
  lang?: string;
}) {
  //const loaderData = useRouteLoaderData<typeof loader>("root");
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <html lang={lang || "en"} className={theme || "light"}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="icon"
            href="/favicon.png"
            type="image/x-icon"
            sizes="16x16"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicon-96x96.png"
            sizes="96x96"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <meta name="apple-mobile-web-app-title" content="Synthetism" />
          <link rel="manifest" href="/site.webmanifest" />

          <Meta />
          <Links />
        </head>
        <body>
          <LoadingBar />
          {children}
          <Scripts />
          <ScrollRestoration />
        </body>
      </html>
    </ThemeContext.Provider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <Layout>
      {isRouteErrorResponse(error) ? (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
          <div className="flex flex-col items-center justify-center space-y-2">
            <h1 className="text-4xl font-semibold">{error.status}</h1>
            <p>{error.data}</p>
          </div>

          <Link to="/">Back to homepage</Link>
        </div>
      ) : error instanceof Error ? (
        <div>
          <h1>Error</h1>
          <p>{error.message}</p>
          <pre>{error.stack}</pre>
        </div>
      ) : (
        <h1>Unknown Error</h1>
      )}
    </Layout>
  );
}

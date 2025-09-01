import type { Route } from "./+types/_index";
import type { MetaFunction } from "react-router";
import {
  useLoaderData,
  data,
  useRouteError,
  isRouteErrorResponse,
} from "react-router";
import Layout from "~/components/HomeLayout";
import { getMarkdownFiles } from "~/utils/file-utils";
import { marked } from "marked";
import { cacheHeader } from "pretty-cache-header";
import { ErrorMessage } from "@core/components/ErrorMessage";
import IndexLayout from "~/components/IndexLayout";

export const meta: MetaFunction = () => {
  return [
    { title: "Pigu.shop - Marketplace management platform" },
    { name: "description", content: "Comprehensive platform to manage Pigu marketplaces" },
  ];
};

export const action = async () => {
  throw new Response("Not allowed", { status: 405 });
};

marked.use({
  breaks: true,
});

export const loader = async () => {
  const entriesList = await getMarkdownFiles("entries");

  return data(
    { entriesList },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": cacheHeader({
          public: true,
          maxAge: "1h",
          staleWhileRevalidate: "1year",
        }),
      },
    },
  );
};

//export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();

export default function Index() {
  const { entriesList } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <div className="mb-10">
        
      </div>
    </Layout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <IndexLayout>
        <ErrorMessage title="Not found" message={error.statusText} />
      </IndexLayout>
    );
  }

  if (error instanceof Error) {
    return (
      <IndexLayout>
        <ErrorMessage title="Not found" message={error.message} />
      </IndexLayout>
    );
  }

  return <ErrorMessage title="Not found" message="Unknown Error" />;
}

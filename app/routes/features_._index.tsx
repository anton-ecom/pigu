
import type { Route } from "./+types/features_._index";
import {
  useLoaderData,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";
import { ErrorMessage } from "@core/components/ErrorMessage";
import IndexLayout from "~/components/IndexLayout";
import DocumentView from "~/components/DocumentView";
import { Features } from "~/components/Features";

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) {
    return [{ title: "Loading..." }];
  }
  return [{ title: 'Features' }];
};

/* export async function loader({ params }: Route.LoaderArgs) {
  const fileName = params.id ? params.id : null;

  if (!fileName) {
    throw new Response("Document not found", { status: 404 });
  }

  try {



  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Response(error.message, {
        status: 404,
        statusText: `Document ${fileName} found `,
      });
    }

    throw new Response(`Document ${fileName} not found`);
  }

} */

export default function Index({
      loaderData,
      }: Route.ComponentProps) {
  //const { fileName, content, parsedContent } = loaderData
  return (
    <IndexLayout>
        <Features/>
    </IndexLayout>
  );
}

export function ErrorBoundary() {
  //  const error = useAsyncError();

  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <IndexLayout>
        <ErrorMessage title={"Not found"} message={error.statusText} />
      </IndexLayout>
    );
  }

  if (error instanceof Error) {
    return (
      <IndexLayout>
        <ErrorMessage title={"Not found"} message={error.message} />
      </IndexLayout>
    );
  }

  return <ErrorMessage title="Not found" message="Unknown Error" />;
}

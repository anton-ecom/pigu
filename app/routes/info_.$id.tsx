
import type { Route } from "./+types/info_.$id";
import {
  useLoaderData,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";
import { ErrorMessage } from "@core/components/ErrorMessage";
import IndexLayout from "~/components/IndexLayout";
import DocumentView from "~/components/DocumentView";
import { readFileIfExistsSafe } from "~/utils/file-utils";
import { marked } from "marked";

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) {
    return [{ title: "Loading..." }];
  }
  return [{ title: data.fileName }];
};

export async function loader({ params }: Route.LoaderArgs) {
  const fileName = params.id ? params.id : null;

  if (!fileName) {
    throw new Response("Document not found", { status: 404 });
  }

  try {
    const path = `/text/${fileName}.md`;

    const content = await readFileIfExistsSafe(`content${path}`);
    const parsedContent = await marked(content, { async: true, breaks: true });

    if (!content) {
      throw new Response(`Document ${fileName} not found`, { status: 404 });
    }

    return {
      fileName,
      path,
      content,
      parsedContent,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Response(error.message, {
        status: 404,
        statusText: `Document ${fileName} found `,
      });
    }

    throw new Response(`Document ${fileName} not found`);
  }
}

export default function Index({
      loaderData,
      }: Route.ComponentProps) {
  const { fileName, content, parsedContent } = loaderData
  return (
    <IndexLayout>
      {content ? (
        <div>
          <div className="flex space-x-2 ">
            <div className="max-w-prose w-full mx-auto">
              <DocumentView html={parsedContent}  />
            </div>
          </div>
        </div>
      ) : (
        <div className="grow">
          <ErrorMessage
            title="Error"
            message={`Document ${fileName} not found`}
          />
        </div>
      )}
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

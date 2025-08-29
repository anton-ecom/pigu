import type { MetaFunction, LoaderFunctionArgs } from "react-router";
import {
  useLoaderData,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";
import { ErrorMessage } from "@core/components/ErrorMessage";
import IndexLayout from "~/components/IndexLayout";
import { readFileIfExistsSafe } from "~/utils/file-utils";
import { parseMarkdown } from "~/utils/parse-utils";
import { SafeHTML } from "~/components/SafeHTML";
export const meta: MetaFunction<typeof loader> = () => {
  return [{ title: "Subscribe Success" }];
};

export async function loader() {
  const fileName = "thanks";
  const path = `system/messages/subscribe-${fileName}.md`;

  try {
    const content = await readFileIfExistsSafe(path);

    if (!content) {
      throw new Response(`Document ${fileName} not found`, { status: 404 });
    }

    const htmlContent = await parseMarkdown(content);
    return {
      fileName,
      path,
      htmlContent, // Pass the Markdown content to the component
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Response(error.message, {
        status: 404,
        statusText: `Document ${fileName} not found `,
      });
    }
    throw new Response("Document not found", {
      status: 404,
      statusText: "Document not found",
    });
  }
}

export default function GroupsThanks() {
  const { htmlContent } = useLoaderData<typeof loader>();

  return (
    <IndexLayout>
      <div className="flex flex-col space-y-2">
        {htmlContent && (
          <div className="prose max-w-none mx-auto">
            <div className="markdown  prose dark:prose-invert">
              <SafeHTML html={htmlContent} />
            </div>
          </div>
        )}
      </div>
    </IndexLayout>
  );
}

export function ErrorBoundary() {
  //  const error = useAsyncError();

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

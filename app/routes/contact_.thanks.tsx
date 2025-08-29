import type { MetaFunction } from "react-router";
import {
  useLoaderData,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";
import { ErrorMessage } from "@core/components/ErrorMessage";
import IndexLayout from "~/components/IndexLayout";
import { readFileIfExistsSafe } from "~/utils/file-utils";
import { SafeHTML } from "~/components/SafeHTML";
import { parseMarkdown } from "~/utils/parse-utils";
export const meta: MetaFunction<typeof loader> = () => {
  return [{ title: "Contact Sent" }];
};

export async function loader() {
  const fileName = "contact-thanks";
  const path = `system/messages/${fileName}.md`;

  try {
    const content = await readFileIfExistsSafe(path);

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

    throw new Response("Unknown error", {
      status: 500,
      statusText: "Unknown error",
    });
  }
}

export default function FormThanks() {
  const { htmlContent } = useLoaderData<typeof loader>();

  return (
    <IndexLayout>
      <div className="flex flex-col space-y-2 my-auto grow ">
        {htmlContent ? (
          <div className="prose max-w-prose my-auto mx-auto">
            <div className="markdown markdown-content prose dark:prose-invert">
              <SafeHTML html={htmlContent} />
            </div>
          </div>
        ) : (
          <ErrorMessage title="Not Found" message="Error loading page" />
        )}
      </div>
    </IndexLayout>
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

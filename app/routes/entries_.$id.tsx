import type { Route } from "./+types/entries_.$id";
import {
  isRouteErrorResponse,
  useRouteError,
} from "react-router";
import { ErrorMessage } from "@core/components/ErrorMessage";
import IndexLayout from "~/components/IndexLayout";
import ArticleView from "~/components/ArticleView";
import {
  readFileIfExistsSafe,
  parseFrontmatter,
} from "~/utils/file-utils";

import { marked } from "marked";

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) {
    return [{ title: "Loading..." }];
  }
  return [{ title: data.title }];
};

export async function loader({ params }: Route.LoaderArgs) {
  const fileName = params.id ? params.id : null;

  if (!fileName) {
    throw new Response(`{Article ${fileName} not found}`, { status: 404 });
  }

  try {
    const path = `entries/${fileName}.md`;

    const content = await readFileIfExistsSafe(path);
    const { metadata, body } = parseFrontmatter(content);
    const parsedContent = await marked(body, { async: true, breaks: true });
    const title = metadata.title || fileName;

    if (!content) {
      throw new Response(`Entry ${fileName} not found`, { status: 404 });
    }

    return {
      fileName,
      title,
      content,
      parsedContent,
      metadata,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Response(error.message, {
        status: 404,
        statusText: `Entry ${fileName} not found `,
      });
    }

    return new Response("Failed to get entry", {
      status: 404,
      statusText: "Failed to get entry",
    });
  }
}
export default function Index({
      loaderData,
      }: Route.ComponentProps) {
  const { title, content, parsedContent, metadata } =loaderData
  return (
    <IndexLayout>
      {content ? (
        <div>
          <div className="flex space-x-2 ">
            <div className=" w-full mx-auto lg:max-w-2xl">
              <ArticleView
                imageUrl={metadata.image}
                html={parsedContent}
                title={title}
                metadata={metadata}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grow">
          <ErrorMessage title="Error" message={"Document not found"} />
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

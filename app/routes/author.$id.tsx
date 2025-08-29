
import type { Route } from "./+types/author.$id";
import type { MetaFunction } from "react-router";
import {
  useLoaderData,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";
import { ErrorMessage } from "@core/components/ErrorMessage";
import IndexLayout from "~/components/IndexLayout";
import { readFileIfExistsSafe, parseFrontmatter } from "~/utils/file-utils";
import { marked } from "marked";
import { SafeHTML } from "~/components/SafeHTML";

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) {
    return [{ title: "Loading..." }];
  }
  return [{ title: data.title }];
};

export async function loader({ params }: Route.LoaderArgs) {
  const userName = params.id ? params.id : null;

  if (!userName) {
    throw new Response("Author not found", { status: 404 });
  }

  try {
    const fileName = `${userName}.md`;
    const path = `authors/${fileName}`;

    const content = await readFileIfExistsSafe(path);
    const { metadata, body } = parseFrontmatter(content);

    const title = metadata.title || fileName;

    if (!content) {
      throw new Response(`Author ${userName} not found`, { status: 404 });
    }
    const html = await marked.parse(body, {
      async: true,
      breaks: true,
      gfm: true,
    });

    return {
      userName,
      fileName,
      title,
      html, // Pass the Markdown content to the component
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Response(error.message, {
        status: 404,
        statusText: `Author ${userName} not found `,
      });
    }

    throw new Response("Document not found", {
      status: 404,
      statusText: "Document not found",
    });
  }
}

export default function Component({
    loaderData,
    }: Route.ComponentProps) {
  const { html, title } = loaderData;

  return (
    <IndexLayout>
      <div className="flex flex-col grow h-full items-stretch">
        {html && (
          <div className="prose max-w-prose mx-auto ">
            <div className="section-header mb-2 text-lg ">Author - {title}</div>
            <div className="prose lg:prose-lg markdown-document dark:prose-invert prose-custom markdown ">
              <SafeHTML html={html} />
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

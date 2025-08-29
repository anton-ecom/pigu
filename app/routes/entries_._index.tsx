import type { MetaFunction, LoaderFunctionArgs } from "react-router";
import { Link, useLoaderData } from "react-router";
import IndexLayout from "~/components/IndexLayout";
import { getMarkdownFiles } from "~/utils/file-utils";
import { EntriesList } from "~/components/Entries";

export const meta: MetaFunction = () => {
  return [
    { title: "Articles" },
    { name: "description", content: "Articles Lists" },
  ];
};
export async function loader() {
  try {
    const entriesList = await getMarkdownFiles("entries");

    console.log("entriesList", entriesList);
    return { entriesList };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Response(error.message, {
        status: 404,
        statusText: "Failed to get document folders",
      });
    }

    throw new Response("Failed to get document folders", {
      status: 404,
      statusText: "Failed to get articles",
    });
  }
}

export default function Entries() {
  const { entriesList } = useLoaderData<typeof loader>();

  return (
    <IndexLayout>
      <div className="text-xl font-semibold mb-4">Entries</div>

      <div className="flex flex-col space-y-4 py-10">
        <EntriesList entriesList={entriesList} />
      </div>
    </IndexLayout>
  );
}

import { Link } from "react-router";
import { SafeHTML } from "~/components/SafeHTML";

export default function ArticleView({
  html,
  title,
  metadata,
  imageUrl,
}: {
  html: string;
  title: string;
  imageUrl: string | null;
  metadata: Record<string, string>;
}) {
  return (
    <>
      {imageUrl && (
        <div className="mb-4 flex flex-col space-y-4">
          <div>
            <img src={imageUrl} alt={title} className="w-full h-auto" />
          </div>
        </div>
      )}

      {metadata.author && (
        <h1 className=" mb-2  lg:text-lg flex space-x-2">
          <div>by</div>{" "}
          <Link to={`/author/${metadata.author}`}>{metadata.author}</Link>
        </h1>
      )}

      <div className="prose lg:prose-lg  xl:prose-xl markdown-document dark:prose-invert prose-custom markdown ">
        <SafeHTML html={html} />
      </div>
    </>
  );
}

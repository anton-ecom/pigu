import { Link } from "react-router";
import type { entryItem } from "~/domain/entities";

import { SafeHTML } from "~/components/SafeHTML";
export default function ArticleView({
  html,
  title,
  post,
}: {
  html: string;
  title: string;
  imageUrl?: string | null;
  post: entryItem;
}) {
  return (
    <>
      <div className="mb-4">
        <Link to="/post">← back to posts</Link>
      </div>
      {post.image && (
        <div className="mb-4 flex flex-col space-y-4">
          <div>
            {post.image && (
              <img
                src={`/images/${post.image}`}
                alt={title}
                className="w-full h-auto"
              />
            )}
          </div>

          {post.imageAlt && (
            <div className="flex justify-between bg-neutral-900 px-4 py-2 rounded">
              <div className="text-center text-sm text-secondary">
                "{post.imageAlt}"
              </div>
              <div className="text-center text-sm text-secondary">
                Artist:{post.author}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="text-3xl font-semibold">{post.title}</div>

      <div className="prose markdown-document dark:prose-invert prose-custom markdown">
        <SafeHTML html={html} />
      </div>
    </>
  );
}

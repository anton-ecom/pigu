import { SafeHTML } from "~/components/SafeHTML";

interface TextProps {
  name: string;
  path: string;
  content: string;
  url?: string;
  title: string;
}

export default function Text({ name, content, path, url, title }: TextProps) {
  const htmlContent = content;

  return (
    <div className="flex flex-col space-y-1 markdown w-full">
      <div className="font-bold section-header"> :: {title}</div>

      <div className="flex space-x-2 pb-4">
        <div>
          $ cat {path}/{name}
        </div>
        {url && (
          <a target="_blank" href={url} rel="noreferrer">
            source
          </a>
        )}
      </div>

      <div className="flex  w-full min-h-screen markdown">
        {/* Render the HTML content */}
        <div className="markdown-content prose dark:prose-invert w-full">
          <SafeHTML html={htmlContent} />
        </div>
      </div>
    </div>
  );
}

import { SafeHTML } from "~/components/SafeHTML";
export default function DocumentView({ html }: { html: string }) {
  return (
    <>
      <div className="prose dark:prose-invert  max-w-none prose-custom markdown-document">
        <SafeHTML html={html} />
      </div>
    </>
  );
}

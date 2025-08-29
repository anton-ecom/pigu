import DOMPurify from "dompurify";

export function SafeHTML({ html }: { html: string }) {
  return (
    <div
      ref={(node) => {
        if (node) node.innerHTML = DOMPurify.sanitize(html);
      }}
    />
  );
}

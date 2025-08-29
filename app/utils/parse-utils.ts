import { Marked, type MarkedOptions } from "marked";

import { baseUrl } from "marked-base-url";
import { APP_URL } from "~/utils/env";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

const marked = new Marked(
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs code-snippet language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);

export async function parseMarkdown(
  markdown: string,
  options?: MarkedOptions,
): Promise<string> {
  marked.use(baseUrl(APP_URL));
  const html = await marked.parse(markdown, options);

  return html;
}

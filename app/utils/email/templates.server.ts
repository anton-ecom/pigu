import fs from "fs/promises";
import path from "path";
import { marked } from "marked";

export async function loadEmailTemplate(
  templateName: string,
  data: Record<string, string>,
): Promise<{ subject: string; body: string }> {
  const filePath = path.resolve(
    "data/system/emails",
    `${templateName}.email.md`,
  );

  let content: string;

  try {
    content = await fs.readFile(filePath, "utf-8");
  } catch {
    throw new Error(`Email template '${templateName}' not found`);
  }

  const [subjectLine, ...rest] = content.split(/^---$/m);
  const subject = injectTemplateVars(
    subjectLine.replace(/^subject:\s*/, "").trim(),
    data,
  );
  const body = injectTemplateVars(rest.join("---").trim(), data);
  const htmlBody = await marked(body, { breaks: true });

  return { subject, body: htmlBody };
}

function injectTemplateVars(str: string, vars: Record<string, string>) {
  return str.replace(/{{(.*?)}}/g, (_, key) => vars[key.trim()] || "");
}

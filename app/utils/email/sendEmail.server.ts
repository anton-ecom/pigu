import nodemailer from "nodemailer";
import {
  SMTP_FROM,
  SMTP_FROM_NAME,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_USER,
} from "../env";
import { loadEmailTemplate } from "./templates.server";

type SendEmailArgs = {
  to: string;
  template: string; // filename (without .md)
  data: Record<string, string>;
};

export async function sendEmail({ to, template, data }: SendEmailArgs) {
  const { subject, body } = await loadEmailTemplate(template, data);

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"${SMTP_FROM_NAME}" <${SMTP_FROM}>`,
    to,
    subject,
    text: body,
    html: body,
  });
}

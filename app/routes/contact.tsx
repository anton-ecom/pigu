import { useTheme } from "~/components/ThemeContext";
import { useRef, useState } from "react";
import type { MetaFunction } from "react-router";
import {
  Form,
  useActionData,
  useNavigation,
  useLoaderData,
  redirect,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";
import { db } from "~/database";
import { TURNSTILE_KEY, TURNSTILE_SECRET, EMAIL_TO } from "~/utils/env";
import { sendEmail } from "~/utils/email/sendEmail.server";
import { readFileIfExistsSafe } from "~/utils/file-utils";
import { getClientIP } from "~/utils/network-utils";
import { ContactSchema } from "~/schemas/contactSchema";
import type { ContactFormInput } from "~/schemas/contactSchema";
import IndexLayout from "~/components/IndexLayout";
import { ErrorMessage } from "@core/components/ErrorMessage";
import { marked } from "marked";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { SafeHTML } from "~/components/SafeHTML";

export const meta: MetaFunction<typeof loader> = () => {
  return [{ title: "Contact" }];
};

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    text: formData.get("text"),
    turnstileToken: formData.get("cf-turnstile-response"),
  };

  if (!raw.turnstileToken) {
    return new Response(
      JSON.stringify({
        success: false,
        errors: {
          turnstile: ["Please complete the CAPTCHA verification."],
        },
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const ip = getClientIP(request);

  // Verify the turnstile token with Cloudflare

  try {
    const turnstileVerification = await verifyTurnstileToken(
      raw.turnstileToken.toString(),
      ip,
    );
    if (!turnstileVerification.success) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: {
            turnstile: ["CAPTCHA verification failed. Please try again."],
          },
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        errors: {
          turnstile: ["CAPTCHA verification failed. Please try again."],
        },
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const parsed = ContactSchema.safeParse(raw);

  if (!parsed.success) {
    return new Response(
      JSON.stringify({
        success: false,
        errors: parsed.error.flatten().fieldErrors,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const { name, email, text } = parsed.data;

  try {
    await db.contacts.create({
      data: { name, email, text },
    });

    await Promise.all([
      sendEmail({
        to: EMAIL_TO,
        template: "contact",
        data: {
          name,
          email,
          text,
        },
      }),

      sendEmail({
        to: email,
        template: "contact-confirm",
        data: {
          name,
          email,
          text,
        },
      }),
    ]);

    return redirect("/contact/thanks");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error", error);
      throw new Response("DB Error", {
        status: 404,
        statusText: "DB Error",
      });
    }
    throw new Response("DB Error", {
      status: 404,
      statusText: "DB Error",
    });
  }
}

async function verifyTurnstileToken(token: string, ip?: string | null) {
  try {
    // Convert form data to URLSearchParams for proper content-type
    const formData = new URLSearchParams();
    formData.append("secret", TURNSTILE_SECRET);
    formData.append("response", token);
    if (ip) formData.append("remoteip", ip);

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    return await response.json();
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return { success: false, error: "Verification failed" };
  }
}

export async function loader() {
  try {
    const fileName = "contact.md";
    const path = `content/text/${fileName}`;

    const [content] = await Promise.all([readFileIfExistsSafe(path)]);

    const htmlContent = await marked(content);

    if (!content) {
      throw new Response("Content not found", { status: 404 });
    }

    return {
      fileName,
      path,
      htmlContent,
      turnstileKey: TURNSTILE_KEY,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Response(error.message, {
        status: 404,
        statusText: "Content not found ",
      });
    }

    return new Response("Content not found", {
      status: 404,
      statusText: "Content not found",
    });
  }
}

export default function Component() {
  const { htmlContent, turnstileKey } = useLoaderData<typeof loader>();
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);

  const actionData = useActionData() as
    | {
        success: false;
        errors: Partial<Record<keyof ContactFormInput, string[]>>;
      }
    | undefined;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  /*
   // Function to reset Turnstile when needed
  const resetTurnstile = () => {
    if (turnstileRef.current) {
      turnstileRef.current.reset();
    }
  }; */

  const { theme } = useTheme();

  return (
    <IndexLayout>
      <div className="flex flex-col max-w-lg mx-auto space-y-6 ">
        {htmlContent && (
          <div className="prose max-w-none">
            <div className="markdown markdown-content prose dark:prose-invert prose-custom">
              <SafeHTML html={htmlContent} />
            </div>
          </div>
        )}

        <Form method="post">
          <div className="space-y-4">
            <div className="flex space-y-1 flex-col">
              <label htmlFor="name" className="block font-medium form-label">
                Name
              </label>
              <input
                id="name"
                disabled={!!isSubmitting}
                name="name"
                type="text"
                className="form-control"
              />
              {actionData?.errors?.name && (
                <p className="text-red-500 text-sm">
                  {actionData.errors.name[0]}
                </p>
              )}
            </div>
            <div className="flex space-y-1 flex-col">
              <label htmlFor="email" className="block font-medium form-label">
                Email
              </label>
              <input
                id="email"
                disabled={!!isSubmitting}
                name="email"
                type="email"
                className="form-control"
              />

              {actionData?.errors?.email && (
                <p className="text-red-500 text-sm">
                  {actionData.errors.email[0]}
                </p>
              )}
            </div>
            <div className="flex space-y-1 flex-col  ">
              <label htmlFor="text" className="block font-medium form-label">
                Message
              </label>
              <textarea
                id="text"
                disabled={!!isSubmitting}
                name="text"
                rows={6}
                className="w-full h-48 form-control"
              />

              {actionData?.errors?.text && (
                <p className="text-red-500 text-sm">
                  {actionData.errors.text[0]}
                </p>
              )}
            </div>

            {/* Turnstile CAPTCHA component */}
            <div className="my-0  flex flex-row" hidden={isSubmitting}>
              <Turnstile
                ref={turnstileRef}
                siteKey={turnstileKey}
                onError={() => {
                  setTurnstileError(
                    "Error loading CAPTCHA. Please refresh the page.",
                  );
                }}
                onExpire={() => {
                  setTurnstileError("CAPTCHA expired. Please verify again.");
                }}
                onSuccess={() => {
                  setTurnstileError(null);
                }}
                options={{
                  theme: theme === "dark" ? "dark" : "light", // Use theme type that matches Turnstile's Theme type
                  appearance: "always",
                  size: "flexible",
                }}
              />
              {(turnstileError || actionData?.errors?.turnstileToken) && (
                <p className="text-red-500 text-sm mt-1">
                  {turnstileError || actionData?.errors?.turnstileToken?.[0]}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send message"}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </IndexLayout>
  );
}

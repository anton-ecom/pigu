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
import { subscribeSchema } from "~/schemas/subscribeSchema";
import type { subscribeSchemaFormInput } from "~/schemas/subscribeSchema";
import { sendEmail } from "~/utils/email/sendEmail.server";
import { readFileIfExistsSafe } from "~/utils/file-utils";
import { parseMarkdown } from "~/utils/parse-utils";
import IndexLayout from "~/components/IndexLayout";
import { ErrorMessage } from "@core/components/ErrorMessage";
import { signalService } from "~/services/signal-service.server";
import DOMPurify from "isomorphic-dompurify";
import { SafeHTML } from "~/components/SafeHTML";
import { EMAIL_TO } from "~/utils/env";
export const meta: MetaFunction<typeof loader> = () => {
  return [{ title: "Subscribe to Newsletter" }];
};

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  const raw = {
    email: formData.get("email"),
  };

  const parsed = subscribeSchema.safeParse(raw);

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

  const { email } = parsed.data;

  try {
    const result = await signalService.subscribe(email);

    if (result.success) {
      await Promise.all([
        sendEmail({
          to: EMAIL_TO,
          template: "subscribe",
          data: {
            email,
          },
        }),

        sendEmail({
          to: email,
          template: "subscribe-confirm",
          data: {
            email,
            token: result.token.toString(),
            unsubscribeUrl: result.unsubscribeUrl,
          },
        }),
      ]);

      return redirect("/subscribe/thanks");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error subscribing to newsletter:", error.message);
    } else {
      console.error("Unknown error subscribing to newsletter:", error);
    }

    throw new Response("Error", {
      status: 404,
      statusText: "Error submitting form",
    });
  }
}

export async function loader() {
  try {
    const fileName = "subscribe.md";
    const path = `text/${fileName}`;

    const [content] = await Promise.all([
      readFileIfExistsSafe(`content/${path}`),
    ]);

    const html = DOMPurify.sanitize(
      await parseMarkdown(content, { async: false, breaks: true }),
    );

    if (!content) {
      throw new Response("Content not found", { status: 404 });
    }

    return {
      fileName,
      path,
      html,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error loading content:", error.message);

      throw new Response(error.message, {
        status: 404,
        statusText: "Content not found",
      });
    }
    throw new Response("Unknown error loading content");
  }
}

export default function Component() {
  const { html } = useLoaderData<typeof loader>();

  const actionData = useActionData() as
    | {
        success: false;
        errors: Partial<Record<keyof subscribeSchemaFormInput, string[]>>;
      }
    | undefined;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <IndexLayout>
      <div className="w-full mx-auto md:w-128  space-y-4  flex-col flex  py-10">
        <div className=" mx-auto">
          {html && (
            <div className="prose max-w-none">
              <div className="markdown markdown-content prose dark:prose-invert">
                <SafeHTML html={html} />
              </div>
            </div>
          )}
        </div>

        <div className="">
          <Form method="post">
            <div className="space-y-6">
              <div className="flex space-y-1 flex-col">
                <label
                  htmlFor="email-input"
                  className="block font-medium form-label"
                >
                  Email
                </label>
                <input
                  id="email-input"
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

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Subscribe"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </IndexLayout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <IndexLayout>
        <ErrorMessage title="Not found" message={error.statusText} />
      </IndexLayout>
    );
  }

  if (error instanceof Error) {
    return (
      <IndexLayout>
        <ErrorMessage title="Not found" message={error.message} />
      </IndexLayout>
    );
  }

  return <ErrorMessage title="Not found" message="Unknown Error" />;
}

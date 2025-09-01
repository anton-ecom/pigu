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
    subject: formData.get("subject"),
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

  const { name, email, text, subject } = parsed.data;

  try {
    await db.contacts.create({
      data: { name, email, text, subject },
    });

    await Promise.all([
      sendEmail({
        to: EMAIL_TO,
        template: "contact",
        data: {
          name,
          subject,
          email,
          text,
        },
      }),

      sendEmail({
        to: email,
        template: "contact-confirm",
        data: {
          name,
          subject,
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

  const subjects: Record<string, string> = {
    'General Inquiry': 'general',
    'Schedule a demo': 'technical',
    'Billing': 'billing',
    'Feedback': 'feedback',
  }

  const { theme } = useTheme();

  return (
    <IndexLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ready to transform your business with Pigu marketplace? Let's discuss how we can help you automate and scale.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="space-y-8">
              {htmlContent && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <div className="prose dark:prose-invert max-w-none">
                    <SafeHTML html={htmlContent} />
                  </div>
                </div>
              )}

              {/* Contact Cards */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <title>Email icon</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email Us</h3>
                      <p className="text-gray-600 dark:text-gray-400">Get a response within 24 hours</p>
                      <a href="mailto:hello@pigu-automation.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                        hello@pigu.shop
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <title>Schedule icon</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Schedule a Demo</h3>
                      <p className="text-gray-600 dark:text-gray-400">See the platform in action</p>
                      <p className="text-blue-600 dark:text-blue-400">30-minute personalized demo</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <title>Support icon</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-9.75 9.75A9.75 9.75 0 0112 2.25z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Expert Support</h3>
                      <p className="text-gray-600 dark:text-gray-400">20+ years of e-commerce experience</p>
                      <p className="text-purple-600 dark:text-purple-400">Technical consulting available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Send us a message
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <Form method="post" className="space-y-6">
                
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    disabled={!!isSubmitting}
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  />
                  {actionData?.errors?.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <title>Error icon</title>
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {actionData.errors.name[0]}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    disabled={!!isSubmitting}
                    name="email"
                    type="email"
                    placeholder="your.email@company.com"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  />
                  {actionData?.errors?.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <title>Error icon</title>
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {actionData.errors.email[0]}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <fieldset>
                  <legend className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    What can we help you with? *
                  </legend>
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(subjects).map(([name, id]) => (
                      <label
                        key={id}
                        className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors group"
                      >
                        <input
                          type="radio"
                          name="subject"
                          value={name}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                          {name}
                        </span>
                      </label>
                    ))}
                  </div>
                  {actionData?.errors?.subject && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <title>Error icon</title>
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {actionData.errors.subject[0]}
                    </p>
                  )}
                </fieldset>

                {/* Message Field */}
                <div>
                  <label htmlFor="text" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="text"
                    disabled={!!isSubmitting}
                    name="text"
                    rows={5}
                    placeholder="Tell us about your business and how we can help..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none transition-colors"
                  />
                  {actionData?.errors?.text && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <title>Error icon</title>
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {actionData.errors.text[0]}
                    </p>
                  )}
                </div>

                {/* Turnstile CAPTCHA */}
                {!isSubmitting && (
                  <div className="flex justify-center">
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
                        theme: theme === "dark" ? "dark" : "light",
                        appearance: "always",
                        size: "flexible",
                      }}
                    />
                  </div>
                )}
                
                {(turnstileError || actionData?.errors?.turnstileToken) && (
                  <p className="text-red-500 text-sm flex items-center justify-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <title>Error icon</title>
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {turnstileError || actionData?.errors?.turnstileToken?.[0]}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <title>Loading spinner</title>
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Send Message</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <title>Send icon</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                  )}
                </button>

                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  We'll respond within 24 hours. Your information is kept confidential.
                </p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </IndexLayout>
  );
}

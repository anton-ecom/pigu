// app/routes/verify-signal.tsx
import { redirect } from "react-router";
import { useLoaderData } from "react-router";
import { signalService } from "~/services/signal-service.server";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return redirect("/");
  }

  const result = await signalService.verify(token);
  return result;
}

export default function VerifySignal() {
  const { success, message } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-2xl font-bold mb-4">
        {success ? "Subscription Verified" : "Verification Failed"}
      </h1>
      <p className="text-xl">{message}</p>
      <a
        href="/"
        className="text-purple-400 hover:text-purple-300 mt-4 inline-block"
      >
        Return to Home
      </a>
    </div>
  );
}

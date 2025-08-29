import { redirect, data } from "react-router";
import { Suspense } from "react";
import {
  useLoaderData,
  useNavigate,
  useLocation,
  Await,
  useAsyncError,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";
import { signalService } from "~/services/signal-service.server";
import { Loading } from "@core/components/Loading"; // Adjust path as needed
import { ErrorMessage } from "@core/components/ErrorMessage"; // Adjust path as needed
import { isDefinitelyAnError } from "~/utils/errors"; // Implement or adjust this import
import IndexLayout from "~/components/IndexLayout";
import { Link } from "react-router";

export type LoaderData = {
  token: number;
  unsubscribePromise: Promise<{ success: boolean; message: string }>;
};

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return redirect("/");
  }

  // Need to await the Promise or return it directly for defer
  const unsubscribePromise = signalService.unsubscribe(token).catch((error) => {
    throw error;
  });

  return { token, unsubscribePromise };
}

export default function Unsubscribe() {
  const { unsubscribePromise } = useLoaderData<LoaderData>();

  return (
    <IndexLayout>
      <div className="w-1/2 mx-auto py-10">
        <Suspense fallback={<Loading isLoading={true} />}>
          <Await
            errorElement={<SuspenseErrorBoundary />}
            resolve={unsubscribePromise}
          >
            {(response: any) => {
              if (!response || !response.success) {
                return (
                  <ErrorMessage
                    title="Not found"
                    message={
                      response?.message ||
                      "Invalid or expired token. This unsubscribe link is no longer valid."
                    }
                  />
                );
              }

              return (
                <div className="container mx-auto py-8 text-center">
                  <h1 className="text-2xl font-bold mb-4">
                    {response.success ? "Unsubscribed" : "Token is incorrect"}
                  </h1>
                  <p className="text-xl">{response.message}</p>
                  <Link to="/" className=" mt-4 inline-block">
                    Return to Home
                  </Link>
                </div>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </IndexLayout>
  );
}

function SuspenseErrorBoundary() {
  const error = useAsyncError();

  console.error("Error in SuspenseErrorBoundary:", error);

  if (isDefinitelyAnError(error)) {
    return (
      <div>
        <ErrorMessage title="Unsubscribe failed" message={error.message} />
        <div className="text-center mt-4">
          <Link to="/" className="mt-4 inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <ErrorMessage title="Error" message={error.statusText} />
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <ErrorMessage title="Error" message={error.message} />
      </div>
    );
  } else {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="text-lg text-secondary">An unexpected error occurred.</p>
      </div>
    );
  }
}

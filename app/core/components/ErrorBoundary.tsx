export function ErrorBoundary({
  title,
  message,
  status,
}: {
  title?: string;
  message?: string;
  status?: number;
}) {
  return (
    <div className="dark:bg-red-900/25 rounded border-red-800 p-4 flex flex-col space-y-2 w-full">
      {title && message ? (
        <div className="flex flex-col space-y-1">
          <div className="text-red-500 font-semibold">
            Something went wrong.
          </div>
          <div>We're unable to load the requested data.</div>
        </div>
      ) : (
        <div className="flex flex-col space-y-1">
          <div className="text-red-500 font-semibold">{title}</div>
          <div>{message}</div>

          {status && (
            <div className="text-sm text-secondary">Status: {status}</div>
          )}
        </div>
      )}
    </div>
  );
}

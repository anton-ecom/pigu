import { TriangleAlert } from "lucide-react";

export function ErrorMessage({
  title,
  message,
  status,
}: {
  title: string;
  message: string;
  status?: number;
}) {
  return (
    <div className="flex items-center justify-center flex-col h-full w-full rounded border-red-800 p-4   grow">
      <div className="mb-4">
        <TriangleAlert strokeWidth={1} className="size-16" />
      </div>

      <div className="space-y-1 flex flex-col items-center justify-center ">
        <div className="font-semibold text-xl">{title}</div>
        <div className="text-secondary text-center w-128 leading-7">
          {message}
        </div>
        {status && (
          <div className="text-sm text-secondary">Status: {status}</div>
        )}
      </div>
    </div>
  );
}

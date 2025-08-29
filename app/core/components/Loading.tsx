export function Loading({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="flex h-full w-full grow flex-col items-center justify-center spinner">
      <div className="flex flex-col space-y-8 justify-center items-center">
        <div className="loader4" aria-label="Loading Spinner"></div>
        <div className="text-secondary">Loading...</div>
      </div>
    </div>
  );
}

// components/LoadingSpinner.tsx
import React from "react";

type LoadingVariant = "loader1" | "loader2" | "loader3" | "loader4"; // Add your variants here
type sizeVariants = "sm" | "md" | "lg" | "xl";

interface LoadingProps {
  isLoading: boolean;
  variant?: LoadingVariant;
  message?: string; // Optional: Customize the loading message
  size?: sizeVariants;
  className: string;
}

export const LoadingSpinner: React.FC<LoadingProps> = ({
  isLoading,
  variant = "loader4",
  size = "md",
  message,
  className = "",
}) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="flex h-full w-full grow flex-col items-center justify-center">
      <div className={`flex flex-col justify-center items-center spinner `}>
        <div
          className={variant + ` spinner-${size} ` + `${className}`}
          aria-label="Loading Spinner"
        ></div>
        {message && <div className="text-secondary py-2">{message}</div>}
      </div>
    </div>
  );
};

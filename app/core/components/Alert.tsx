import React, { useState } from "react";
import { X } from "lucide-react";
import { cn } from "~/lib/utils"; // Utility for conditional classes

interface AlertProps {
  message: string;
  variant?: "danger" | "success" | "warning" | "info";
  size?: "base" | "sm";
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  message,
  variant = "info",
  size = "base",
  onClose,
}) => {
  const [closed, setClosed] = useState(false);

  return (
    <div
      className={cn(
        " items-center justify-between rounded-md px-4 py-3",
        closed ? "hidden" : "flex",
        size === "sm" ? "text-sm" : "text-base",
        variantClasses[variant],
      )}
    >
      <span>{message}</span>

      <button
        onClick={() => setClosed(true)}
        className="ml-2 text-current hover:text-opacity-75"
        aria-label="Close"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
};

// Variant-specific classes
const variantClasses: Record<string, string> = {
  danger: "bg-red-100 text-red-800 border border-red-200",
  success: "bg-green-100 text-green-800 border border-green-200",
  warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  info: "bg-blue-100 text-blue-800 border border-blue-200",
};

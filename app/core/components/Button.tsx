// src/components/Button.tsx

import type React from "react";
import { useState } from "react";
import classNames from "classnames";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "success"
    | "danger"
    | "warning"
    | "default"
    | string; // Define allowed variants
  size?: "xs" | "sm" | "md" | "lg"; // Define allowed sizes
  isLoading?: boolean; // Optional loading state
  children: React.ReactNode;

  mode?: "btn" | null;
  onAction?: () => Promise<void>;
  loadingText?: string | null;
}

const iconSizes: { [key: string]: string } = {
  xs: "size-3",
  sm: "size-3",
  md: "size-4",
  lg: "size-5",
};

export const Button: React.FC<LoadingButtonProps> = ({
  variant = "default",
  size = "md",
  isLoading = false,
  children,
  disabled,
  mode,
  onAction,
  loadingText,
  ...props
}) => {
  const [internalLoading, setInternalLoading] = useState(false);

  const handleClick = async () => {
    if (onAction) {
      setInternalLoading(true);
      try {
        await onAction();
      } catch (error) {
        console.error("Error executing action", error);
      } finally {
        setInternalLoading(false);
      }
    }
  };

  const buttonClass = classNames(
    "btn", // Base button class
    `btn-${variant}`, // Variant class
    `btn-${size}`, // Size class
    {
      "btn-loading": isLoading, // Loading state class
      "btn-disabled": disabled || isLoading, // Disabled state class
    },
  );

  return (
    <button
      type="button"
      className={buttonClass}
      disabled={disabled || isLoading} // Disable button if disabled or loading
      {...props} // Spread remaining props (including onClick)
      onClick={handleClick}
    >
      {isLoading || internalLoading ? (
        // Display a spinner or loading indicator
        <div className="flex space-x-2 text-secondary items-center  ">
          <div>
            <Loader2 className={`animate-spin ${iconSizes[size]} mr-2 `} />
          </div>
          {loadingText ? loadingText : children}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

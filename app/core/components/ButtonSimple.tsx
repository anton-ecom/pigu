import React, { useState } from "react";
import classNames from "classnames";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean; // Optional loading state
  children: React.ReactNode;
  loadingText: string;
  size?: number;
  font?: "xs" | "sm" | "base" | "md" | "lg";
  onAction: () => Promise<void>; // Function to handle the action, expected to be async
}

export const ButtonSimple: React.FC<ButtonProps> = ({
  isLoading = false,
  loadingText = "",
  children,
  disabled,
  onAction,
  size = 5,
  font = "base",
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

  return (
    <button
      type="button"
      disabled={disabled || isLoading || internalLoading} // Disable button if disabled or loading
      onClick={handleClick} // Call handleClick to manage loading state
      {...props} // Spread remaining props (including onClick)
    >
      {isLoading || internalLoading ? (
        // Display a spinner or loading indicator
        <div className="flex space-x-2 text-secondary items-center dark:bg-neutral-800/25 py-2 px-2">
          <Loader2 className={`animate-spin size-${size} mr-2 `} />
          <div className={`text-${font}`}>
            {loadingText || <div>Loading...</div>}
          </div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default ButtonSimple;

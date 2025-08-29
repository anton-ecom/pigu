import React, { useState } from "react";
import {
  Switch as SwitchComponent,
  SwitchProps,
} from "@core/components/ui/switch";
import { cn } from "~/lib/utils";
import { Loader2 } from "lucide-react";

interface CustomSwitchProps extends Omit<SwitchProps, "onCheckedChange"> {
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "success"
    | "danger"
    | "warning"
    | "default";
  size?: "xs" | "sm" | "md" | "lg";
  isLoading?: boolean;
  handleChange?: (checked: boolean) => Promise<void> | void;
}

export const Switch: React.FC<CustomSwitchProps> = ({
  variant = "default",
  size = "md",
  checked,
  isLoading = false,
  handleChange,
  disabled,
  className,
  ...props
}) => {
  const [internalLoading, setInternalLoading] = useState(false);

  const handleCheckedChange = async (isChecked: boolean) => {
    if (handleChange) {
      setInternalLoading(true);
      try {
        await handleChange(isChecked);
      } catch (error) {
        console.error("Error executing action", error);
      } finally {
        setInternalLoading(false);
      }
    }
  };

  const switchClass = cn(
    "switch",
    `switch-${variant}`,
    `switch-${size}`,
    {
      "opacity-50 cursor-not-allowed": disabled || isLoading || internalLoading,
    },
    className,
  );

  return (
    <div className="relative inline-flex items-center">
      <SwitchComponent
        checked={checked}
        disabled={disabled || isLoading || internalLoading}
        onCheckedChange={handleCheckedChange}
        className={switchClass}
        {...props}
      />
      {(isLoading || internalLoading) && (
        <Loader2 className="absolute right-0 w-4 h-4 -mr-5 animate-spin" />
      )}
    </div>
  );
};

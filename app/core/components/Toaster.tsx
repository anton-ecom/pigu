// app/components/CustomToastContainer.tsx

import React from "react";
import { Toaster as ToasterContainer } from "sonner";
import { Check } from "lucide-react";

export const Toaster: React.FC<any> = (props) => {
  return (
    <ToasterContainer
      theme="dark"
      position="top-right"
      visibleToasts={9}
      closeButton={true}
      invert={true}
      duration={5000}
      pauseWhenPageIsHidden={true}
      toastOptions={{
        unstyled: false,
        classNames: {
          toast:
            "group dark:bg-black bg-white dark:border-neutral-700 text-white",
          closeButton:
            "opacity-0  group-hover:opacity-100 ease-in transition duration-200 dark:hover:bg-neutral-700 bg-none dark:text-neutral-400 border-neutral-700",
        },
      }}
      icons={{
        success: <Check className="size-4 text-green-500" />,
      }}
    />
  );
};

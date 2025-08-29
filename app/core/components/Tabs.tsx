import React from "react";
import { ReactNode } from "react";
import { Tab } from "~/types"; // Define your typ
import clsx from "clsx";

function isValidIcon(icon: string): boolean {
  // Basic validation for valid SVG (can be extended as needed)
  return icon.startsWith("<svg") && icon.endsWith("</svg>");
}

function SafeIcon({ icon }: { icon: ReactNode | string }) {
  if (typeof icon === "string") {
    return icon.startsWith("<svg") && icon.endsWith("</svg>") ? (
      <div className="w-5 h-5" dangerouslySetInnerHTML={{ __html: icon }} />
    ) : (
      "null"
    );
  }
  return <>{icon}</>; // Render ReactNode directly
}

export function TabsModule({
  tabs,
  activeTab,
  onTabSwitch,
}: {
  tabs: Tab[];
  activeTab: string;
  onTabSwitch: (tab: string) => void;
}) {
  return (
    <div className="flex items-center space-x-2 text-sm grow">
      {tabs.map((item) => (
        <button
          key={item.code}
          onClick={() => onTabSwitch(item.code)}
          className={clsx(
            "relative flex items-center border  px-4 py-2 space-x-2 bg-gray-100  rounded-md dark:bg-transparent dark:hover:bg-neutral-700/50 hover:bg-gray-200",
            {
              "dark:bg-neutral-700 border-blue-500 border":
                item.code === activeTab,
              "border-transparent border": item.code !== activeTab,
            },
          )}
        >
          {!!item.count && item.count > 0 && (
            <div className="absolute top-[-10px] right-[-10px] z-10 min-w-4 max-w-6 rounded-full h-4 text-white bg-green-600 flex items-center justify-center">
              <div className="w-full p-1 text-[10px] text-center">
                {item.count < 9 ? item.count : "9+"}
              </div>
            </div>
          )}

          <div>{item.icon && <SafeIcon icon={item.icon} />}</div>

          {item.name && <div>{item.name}</div>}
        </button>
      ))}
    </div>
  );
}

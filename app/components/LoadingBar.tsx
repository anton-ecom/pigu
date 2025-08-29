// app/components/LoadingBar.tsx
import { useNavigation } from "react-router";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@core/components/LoadingSpinner";

export default function LoadingBar() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (navigation.state === "loading") {
      setVisible(true);
    } else {
      // Wait a moment before hiding to reduce flicker
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [navigation.state]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 h-[2px]">
      <div
        className={`absolute top-0 left-0 h-[2px] z-50 bg-gradient-to-r from-emerald-700 via-emerald-500 to-[#00FF88]  transition-opacity ease-out ${
          visible ? " animate-loading-bar opacity-100" : "opacity-0 "
        }`}
      />
      <div
        className={` top-0 left-0 duration-700 opacity-100 h-[2px] bg-neutral-300 z-40 dark:bg-neutral-800 w-full ${visible ? "absolute" : "hidden"} `}
      >
        &nbsp;
      </div>
    </div>
  );
}

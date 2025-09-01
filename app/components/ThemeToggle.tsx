// ThemeSwitch.tsx
import { useTheme } from "~/components/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ textClass }: { textClass?: string }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className=" flex justify-end">
      <button
        type="button"
        onClick={toggleTheme}
        className={`text-xs font-mono  px-2 py-1 rounded transition ${textClass || 'text-white'} dark:hover:bg-neutral-900/10 hover:bg-neutral-100/25`}
      >
        {theme === "light" ? (
          <Sun className="size-5" />
        ) : (
          <Moon className="size-5" />
        )}
      </button>
    </div>
  );
}

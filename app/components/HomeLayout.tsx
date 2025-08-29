import type { ReactNode } from "react";
import { useTheme } from "~/components/ThemeContext";
import { Menu } from "~/components/Menu";
import { Footer } from "~/components/Footer";

import { menuItems } from "~/config/menu-items";

import ThemeToggle from "~/components/ThemeToggle";
interface LayoutProps {
  children: ReactNode;
}

export default function IndexLayout({ children }: LayoutProps) {
  const { theme } = useTheme();
  // Now you can use theme or setTheme here

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col items-stretch min-h-screen">
      <div className="flex items-center space-x-4 flex-row  justify-end md:px-10 px-4 py-4 shrink">
        <div>
          <ThemeToggle />
        </div>
        <div className=" space-x-2 md:flex hidden">
          <Menu menuItems={menuItems} />
        </div>
      </div>

      <div className="flex items-center flex-col   justify-between md:px-10 px-4 py-4 shrink">
        <img src={`/assets/icon-${theme}.svg`} alt="Jizendo" className="h-24" />

        <div className="text-4xl mb-1">Jizendo</div>
        <div>The Way of Philanthropy</div>
      </div>

      <div className="md:px-10 px-4 grow mb-10 overflow-hidden">{children}</div>

      <div className="md:px-10 px-4 shrink">
        <Footer />
      </div>
    </div>
  );
}

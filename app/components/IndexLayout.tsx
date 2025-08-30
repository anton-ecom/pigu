import type { ReactNode } from "react";
import { useTheme } from "~/components/ThemeContext";
import { Menu } from "~/components/Menu";
import { Footer } from "~/components/Footer";
import { Link } from "react-router";
import { menuItems } from "~/config/menu-items";
import ThemeToggle from "~/components/ThemeToggle";

interface LayoutProps {
  children: ReactNode;
}

export default function IndexLayout({ children }: LayoutProps) {
  const { theme } = useTheme();

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col items-stretch min-h-screen">
      <div className="flex items-center flex-row justify-center  md:justify-between md:px-10 px-4 py-4 shrink">
        <div className=" flex space-x-2 items-start ">
          <Link to="/" className="flex space-x-1  items-end text-green ">
            <div>
              <img
                src={`/assets/icon-${theme}.svg`}
                alt="Pigu.shop"
                className="h-8"
              />
            </div>
          </Link>
        </div>

        <div className="md:flex space-x-4 hidden">
          <div>
            <ThemeToggle />
          </div>
          <Menu menuItems={menuItems} />
        </div>
      </div>

      <div className="md:px-10 px-4 mb-4 overflow-hidden  grow">{children}</div>

      <div className="md:px-10 px-4 shrink">
        <Footer />
      </div>
    </div>
  );
}

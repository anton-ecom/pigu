import type { ReactNode } from "react";
import { useTheme } from "~/components/ThemeContext";
import { Menu } from "~/components/Menu";
import { Footer } from "~/components/Footer";
import { Link } from "react-router";
import { menuItems } from "~/config/menu-items";
import ThemeToggle from "~/components/ThemeToggle";
import { Header } from "./Header";
import { CallToAction } from "./CallToAction";

interface LayoutProps {
  children: ReactNode;
}

export default function IndexLayout({ children }: LayoutProps) {
  const { theme } = useTheme();

  return (

    <>
   
    <div className=" mx-auto flex flex-col items-stretch min-h-screen grow">
      <div className="max-w-screen-xl">
        <Header textClass="dark:text-white text-black" />
      </div>
      <div>{children}</div>

  
      <div className="md:px-10 px-4 shrink max-w-screen-xl">
        <Footer />
      </div>
    </div>
   </>
  );
}

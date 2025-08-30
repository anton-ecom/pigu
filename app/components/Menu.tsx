// app/components/menu.tsx

import { Link } from "react-router";

interface MenuItem {
  id: number;
  name: string;
  url: string;
  icon?: string;
}

interface MenuProps {
  menuItems: Array<MenuItem>;
}

export function Menu({ menuItems }: MenuProps) {
  return (
    <div className="flex flex-row md:space-x-4 space-x-2 grow   overflow-y-auto">
      {menuItems.map((menuItem) => (
        <MenuItem key={menuItem.id} item={menuItem} />
      ))}
    </div>
  );
}

function MenuItem({ item }: { item: MenuItem }) {
  return (
    <Link to={item.url}>
      <div className="flex w-full text-white space-x-2 md:text-base">
        <div>{item.name}</div>
      </div>
    </Link>
  );
}

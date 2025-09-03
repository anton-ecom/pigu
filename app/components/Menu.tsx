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
  textClass?: string;
}

export function Menu({ menuItems, textClass }: MenuProps) {
  return (
    <div className="flex flex-row md:space-x-4 space-x-2 grow text-inherit   overflow-y-auto ">
      {menuItems.map((menuItem) => (
        <MenuItem key={menuItem.id} item={menuItem} textClass={textClass} />
      ))}
    </div>
  );
}

function MenuItem({
  item,
  textClass,
}: {
  item: MenuItem;
  textClass?: string;
}) {
  return (
    <Link to={item.url}>
      <div className="flex  w-full md:space-x-4 md:text-base text-inherit">
        <div className={textClass ?? "text-white"}>{item.name}</div>
      </div>
    </Link>
  );
}

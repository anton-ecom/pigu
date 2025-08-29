import { Link } from "react-router";

export function Footer() {
  return (
    <div className="md:text-base text-lg border-neutral-700 space-y-2 md:space-y-0 py-4 flex justify-between md:flex-row flex-col items-center ">
      <div className="flex  items-center md:flex-row flex-col md:space-x-4 md:space-y-0 space-x-0 space-y-1 ">
        <div className="font-bold ">Ji-Zen-Do </div>
        <div className="text-secondary text-base">The Way of Philanthropy</div>
      </div>
      <div className="flex md:space-x-2  md:flex-row md:space-y-0 space-y-2 ">
        <div className="flex flex-row  space-x-4 ">
          <div>
            <a href="/contact">Contact</a>
          </div>
          <div>
            <Link to="/subscribe">Subscribe</Link>
          </div>

          <div>
            <Link to="/info/about">About</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

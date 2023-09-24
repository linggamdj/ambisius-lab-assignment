"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const path = usePathname();

  return (
    <>
      <div className="flex justify-between ">
        <div className="w-3/4 overflow-hidden rounded-xl bg-slate-100 p-1 mb-2">
          <ul className="flex items-center gap-2 text-sm font-medium">
            <li className="flex-1">
              <Link
                href="/menu"
                className={`${
                  path === "/menu" ? "bg-white shadow" : ""
                } flex items-center justify-center gap-2 rounded-lg px-3 py-2`}
              >
                Menu
              </Link>
            </li>
            <li className="flex-1">
              <Link
                href="/order"
                className={`${
                  path === "/order" ? "bg-white shadow" : ""
                } flex items-center justify-center gap-2 rounded-lg px-3 py-2`}
              >
                Order
              </Link>
            </li>
            <li className="flex-1">
              <Link
                href="/dapur"
                className={`${
                  path === "/dapur" ? "bg-white shadow" : ""
                } flex items-center justify-center gap-2 rounded-lg px-3 py-2`}
              >
                Dapur
              </Link>
            </li>
            <li className="flex-1">
              <Link
                href="/kasir"
                className={`${
                  path === "/kasir" ? "bg-white shadow" : ""
                } flex items-center justify-center gap-2 rounded-lg px-3 py-2`}
              >
                Kasir
              </Link>
            </li>
          </ul>
        </div>
        <div className="reset-button">
          <button className="mt-0.5 bg-red-900 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50">
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;

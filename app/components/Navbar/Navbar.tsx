"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultMenus } from "@/app/helpers/Constants";

const Navbar = () => {
  const path = usePathname();

  const resetHandler = (): void => {
    localStorage.setItem("menus", defaultMenus);
    localStorage.removeItem("orders");

    window.location.reload();
  };

  return (
    <>
      <div className="flex justify-between mb-2 text-sm">
        <div className="w-3/4 overflow-hidden rounded-lg bg-slate-100 p-1">
          <ul className="flex items-center gap-2">
            <li className="flex-1">
              <Link
                href="/menu"
                className={`${
                  path === "/menu" ? "bg-white shadow" : ""
                } flex items-center justify-center gap-2 rounded-md px-3 py-2`}
              >
                Menu
              </Link>
            </li>
            <li className="flex-1">
              <Link
                href="/order"
                className={`${
                  path === "/order" ? "bg-white shadow" : ""
                } flex items-center justify-center gap-2 rounded-md px-3 py-2`}
              >
                Order
              </Link>
            </li>
            <li className="flex-1">
              <Link
                href="/dapur"
                className={`${
                  path === "/dapur" ? "bg-white shadow" : ""
                } flex items-center justify-center gap-2 rounded-md px-3 py-2`}
              >
                Dapur
              </Link>
            </li>
            <li className="flex-1">
              <Link
                href="/kasir"
                className={`${
                  path === "/kasir" ? "bg-white shadow" : ""
                } flex items-center justify-center gap-2 rounded-md px-3 py-2`}
              >
                Kasir
              </Link>
            </li>
          </ul>
        </div>
        <button
          className="text-white my-auto py-3 px-4 bg-red-800 rounded-md hover:bg-zinc-700"
          onClick={resetHandler}
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default Navbar;

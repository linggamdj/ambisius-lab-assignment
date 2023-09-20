"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const path = usePathname();

  return (
    <>
      <div className="overflow-hidden rounded-xl bg-slate-100 p-1 mb-2">
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
    </>
  );
};

export default Navbar;

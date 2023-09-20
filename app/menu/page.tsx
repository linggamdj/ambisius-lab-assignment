"use client";

import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";

const MenuPage = () => {
  const [menus, setMenus] = useState<any>(null);
  const [menu, setMenu] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    setLoading(true);

    let local: any = localStorage.getItem("menus");

    if (local === null) {
      localStorage.setItem(
        "menus",
        `[{"id":"996756","name":"Ayam Kecap Manis"},{"id":"362342","name":"Nasi Goreng Spesial"}]`
      );
      local = localStorage.getItem("menus");
    }

    setMenus(JSON.parse(local));

    setLoading(false);
  }, []);

  const addHandler: any = () => {
    menus.push({
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      name: menu,
    });

    localStorage.setItem("menus", JSON.stringify(menus));
    setMenus(menus);
    setMenu("");
  };

  const deleteHandler: any = (id: string) => {
    const filtered = menus.filter((menu: any) => menu.id !== id);

    localStorage.setItem("menus", JSON.stringify(filtered));
    setMenus(filtered);
  };

  return (
    <section className="menu">
      <div className="h-auto p-5 rounded-xl bg-slate-100 text-sm">
        <p>Menu Makanan</p>
        <div className="flex my-2">
          <input
            value={menu}
            onChange={(e) => {
              setMenu(e.target.value);
            }}
            className="border rounded w-full py-2 px-3 focus:outline-none"
            type="text"
            name="menu"
            placeholder="Tambahkan di sini ..."
          />
          <button
            onClick={addHandler}
            className="ml-2 bg-zinc-900 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={!menu}
          >
            Tambah
          </button>
        </div>

        <div className="overflow-auto p-4">
          <table className="table-auto w-full text-left">
            <thead className="align-stretch text-zinc-400">
              <tr className="border-b">
                <th className="h-12 px-4 text-left w-[100px]">ID</th>
                <th className="h-12 px-4 text-left">Menu</th>
                <th className="h-12 px-4 text-right">Hapus?</th>
              </tr>
            </thead>
            <tbody>
              {menus
                ? menus?.map((menu: any) => {
                    return (
                      <tr key={+menu.id} className="border-b">
                        <td className="p-4 align-middle">{menu.id}</td>
                        <td className="p-4 align-middle">{menu.name}</td>
                        <td className="flex justify-end p-4">
                          <button onClick={() => deleteHandler(menu.id)}>
                            <AiFillDelete className="text-red-800" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>

          <p className="text-center font-light mt-5">
            Daftar menu restoran Anda
          </p>
        </div>
      </div>
    </section>
  );
};

export default MenuPage;

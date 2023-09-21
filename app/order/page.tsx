"use client";

import React, { useState, useEffect } from "react";
import Select from "react-select";

const OrderPage = () => {
  const [form, setForm] = useState<any>({
    tableId: "",
    menuId: "",
    quantity: 0,
  });
  const [table, setTable] = useState<any>(null);
  const [menus, setMenus] = useState<any>(null);
  let menuOptions: any[] = [];
  const quantity = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
  ];

  useEffect(() => {
    const localMenus: any = localStorage.getItem("menus");
    setMenus(JSON.parse(localMenus));
  }, []);

  menus?.map((menu: any) => {
    menuOptions.push({
      value: menu.id,
      label: menu.name,
    });
  });

  const addHandler: any = () => {
    let localOrders: any = localStorage.getItem("orders");

    if (localOrders === null) {
      localStorage.setItem("orders", `[]`);
      localOrders = localStorage.getItem("orders");
    }

    localOrders = JSON.parse(localOrders);

    localOrders.push({
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      tableId: form.tableId,
      menuId: form.menuId,
      quantity: form.quantity,
    });

    setForm({
      tableId: "",
      menuId: "",
      quantity: 0,
    });

    localStorage.setItem("orders", JSON.stringify(localOrders));
  };

  return (
    <section className="order">
      <div className="h-auto min-h-[300px] p-5 rounded-xl bg-slate-100 text-sm">
        <div className="border rounded-xl bg-white mb-2">
          <ul className="flex items-center text-sm font-medium">
            <li className="flex-1">
              <button
                onClick={(e: any) => {
                  form.tableId === "1"
                    ? setForm({ ...form, tableId: "" })
                    : setForm({ ...form, tableId: "1" });
                }}
                className={`${
                  form.tableId === "1" ? "bg-neutral-900 text-white" : ""
                } w-full h-[50px] rounded-l-xl px-3 py-2`}
              >
                Meja 1
              </button>
            </li>
            <li className="flex-1">
              <button
                onClick={(e: any) => {
                  form.tableId === "2"
                    ? setForm({ ...form, tableId: "" })
                    : setForm({ ...form, tableId: "2" });
                }}
                className={`${
                  form.tableId === "2" ? "bg-neutral-900 text-white" : ""
                } w-full h-[50px] flex items-center justify-center px-3 py-2`}
              >
                Meja 2
              </button>
            </li>
            <li className="flex-1">
              <button
                onClick={(e: any) => {
                  form.tableId === "3"
                    ? setForm({ ...form, tableId: "" })
                    : setForm({ ...form, tableId: "3" });
                }}
                className={`${
                  form.tableId === "3" ? "bg-neutral-900 text-white" : ""
                } w-full h-[50px] flex items-center justify-center rounded-r-xl px-3 py-2`}
              >
                Meja 3
              </button>
            </li>
          </ul>
        </div>
        <div className="flex mb-2">
          <div className="grow mr-2">
            <p className="mb-2">Menu</p>
            <Select
              options={menuOptions}
              onChange={(e: any) => {
                setForm({ ...form, menuId: e.value });
              }}
              instanceId="menu"
            />
          </div>
          <div>
            <p className="mb-2">Jumlah</p>
            <Select
              options={quantity}
              onChange={(e: any) => {
                setForm({ ...form, quantity: e.value });
              }}
              instanceId="qty"
            />
          </div>
        </div>
        <div className="text-right">
          <button
            onClick={addHandler}
            className="text-right bg-zinc-900 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={
              form.tableId.length === 0 &&
              form.menuId.length === 0 &&
              form.quantity === 0
            }
          >
            Tambah
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderPage;

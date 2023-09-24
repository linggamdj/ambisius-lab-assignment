"use client";

import React, { useState, useEffect } from "react";
import Select from "react-select";
import { OrderForm } from "../types/OrderForm.types";
import { Menus } from "../types/Menus.types";
import { Options } from "../types/Options.types";
import { Orders } from "../types/Orders.types";

const OrderPage = () => {
  const [form, setForm] = useState<OrderForm>({
    tableId: "",
    menuId: "",
    quantity: 0,
  });
  const [menus, setMenus] = useState<Menus[] | []>();
  let menuOptions: Options[] = [];
  const quantity: Options[] = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
  ];

  useEffect(() => {
    const localMenus: string | null = localStorage.getItem("menus");
    setMenus(JSON.parse(localMenus || "[]"));
  }, []);

  menus?.map((menu: Menus) => {
    menuOptions.push({
      value: menu.id,
      label: menu.name,
    });
  });

  const addHandler = (): void => {
    let localOrders: Array<Orders> | string | null =
      localStorage.getItem("orders");

    if (localOrders === null) {
      localStorage.setItem("orders", "[]");
      localOrders = localStorage.getItem("orders") || "[]";
    }

    localOrders = JSON.parse(localOrders) as Array<Orders>;

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
                onClick={() => {
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
                onClick={() => {
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
                onClick={() => {
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
              onChange={(option) => {
                setForm({ ...form, menuId: option?.value.toString() || "" });
              }}
              placeholder="Pilih menu"
              instanceId="menu"
            />
          </div>
          <div className="w-[120px]">
            <p className="mb-2">Jumlah</p>
            <Select
              options={quantity}
              onChange={(option) => {
                setForm({ ...form, quantity: Number(option?.value) });
              }}
              placeholder="Kuantitas"
              instanceId="qty"
            />
          </div>
        </div>
        <div className="text-right">
          <button
            onClick={addHandler}
            className="text-right bg-zinc-900 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={
              form.tableId === "" || form.menuId === "" || form.quantity === 0
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

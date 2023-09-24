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
    menuId: { value: "", label: "Pilih Menu" },
    quantity: { value: 0, label: "Kuantitas" },
  });
  const [menus, setMenus] = useState<Menus[] | []>();
  let menuOptions: Options[] = [{ value: "", label: "Pilih menu" }];
  const quantityOptions: Options[] = [
    { value: 0, label: "Kuantitas" },
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
      menuId: form.menuId.value,
      quantity: form.quantity.value,
    });

    setForm({
      tableId: "",
      menuId: menuOptions[0],
      quantity: quantityOptions[0],
    });

    localStorage.setItem("orders", JSON.stringify(localOrders));
  };

  return (
    <section className="order">
      <div className="h-auto min-h-[300px] p-5 rounded-xl bg-slate-100 text-sm">
        <div className="border rounded-xl bg-white mb-4">
          <ul className="flex">
            <li className="flex-1">
              <button
                onClick={() => {
                  form.tableId === "1"
                    ? setForm({ ...form, tableId: "" })
                    : setForm({ ...form, tableId: "1" });
                }}
                className={`${
                  form.tableId === "1"
                    ? "bg-neutral-900 text-white"
                    : "hover:bg-slate-50"
                } w-full h-[70px] rounded-l-xl border-r px-3 py-2`}
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
                  form.tableId === "2"
                    ? "bg-neutral-900 text-white"
                    : "hover:bg-slate-50"
                } w-full h-[70px] px-3 py-2`}
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
                  form.tableId === "3"
                    ? "bg-neutral-900 text-white"
                    : "hover:bg-slate-50"
                } w-full h-[70px] rounded-r-xl border-l px-3 py-2`}
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
              value={form.menuId}
              options={menuOptions}
              onChange={(option) => {
                setForm({
                  ...form,
                  menuId: {
                    value: option?.value || "",
                    label: option?.label || "",
                  },
                });
              }}
              placeholder="Pilih menu"
              instanceId="menu"
            />
          </div>
          <div className="w-[130px]">
            <p className="mb-2">Jumlah</p>
            <Select
              value={form.quantity}
              options={quantityOptions}
              onChange={(option) => {
                setForm({
                  ...form,
                  quantity: {
                    value: Number(option?.value),
                    label: option?.label || "",
                  },
                });
              }}
              placeholder="Kuantitas"
              instanceId="qty"
            />
          </div>
        </div>
        <div className="text-right">
          <button
            onClick={addHandler}
            className="text-right bg-zinc-900 hover:bg-zinc-700 text-white py-2 px-4 rounded disabled:opacity-50"
            disabled={
              form.tableId === "" ||
              form.menuId.value === "" ||
              form.quantity.value === 0
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

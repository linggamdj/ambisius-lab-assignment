"use client";

import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Menus } from "../types/Menus.types";
import { Orders } from "../types/Orders.types";
import { Options } from "../types/Options.types";

const KasirPage = () => {
  const [menus, setMenus] = useState<Menus[]>([]);
  const [orders, setOrders] = useState<Orders[]>([]);
  const [ordersById, setOrdersById] = useState<Orders[]>();
  const [tableId, setTableId] = useState<Options>({
    value: "",
    label: "Nomor Meja",
  });
  const [isShow, setIsShow] = useState<boolean>(false);
  let tableOptions: Options[] = [{ value: "", label: "Nomor Meja" }];

  useEffect(() => {
    const localMenus: string | null = localStorage.getItem("menus") || "[]";
    const localOrders: string | null = localStorage.getItem("orders") || "[]";

    setMenus(JSON.parse(localMenus));
    setOrders(JSON.parse(localOrders));
  }, []);

  const uniqueIds = new Set<string>();

  const filteredOrders = orders?.filter((order: Orders) => {
    if (!uniqueIds.has(order.tableId)) {
      uniqueIds.add(order.tableId);
      return true;
    }

    return false;
  });

  filteredOrders
    ?.sort((a: Orders, b: Orders) => Number(a.tableId) - Number(b.tableId))
    .map((order: Orders) => {
      tableOptions.push({
        value: order.tableId,
        label: order.tableId,
      });
    });

  const mapMenus = new Map<string | number, Menus>(
    menus?.map((menu: Menus) => [menu.id, menu])
  );

  const joinResult = orders
    ?.filter((order: Orders) => mapMenus.has(order.menuId))
    .map((order: Orders) => ({
      ...order,
      menu: mapMenus.get(order.menuId),
    }));

  const printHandler = (): void => {
    setOrdersById(
      joinResult.filter((order: Orders) => order.tableId === tableId.value)
    );

    setIsShow(true);
  };

  const deleteHandler = (): void => {
    const deleteById = orders?.filter(
      (order: Orders) => order.tableId !== tableId.value
    );
    localStorage.setItem("orders", JSON.stringify(deleteById));
    setOrders(deleteById);

    setTableId(tableOptions[0]);
    setIsShow(false);
  };

  return (
    <section className="kasir">
      <div className="h-auto min-h-[300px] p-5 rounded-md bg-slate-100 text-sm">
        <div className="flex justify-between mb-2">
          <div className="flex w-2/4">
            <div className="grow mr-2">
              <p className="mb-2">Meja</p>
              <Select
                value={tableId}
                options={tableOptions}
                onChange={(option) => {
                  setTableId({
                    value: option?.value || "",
                    label: option?.label || "",
                  });
                }}
                placeholder="Nomor Meja"
                instanceId="menu"
              />
            </div>
            <div className=" mt-auto">
              <button
                onClick={printHandler}
                className="text-right bg-zinc-900 hover:bg-zinc-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
                disabled={tableId.value === ""}
              >
                Print Struk
              </button>
            </div>
          </div>
          {tableId.value ? (
            <div className="mt-auto">
              <button
                onClick={deleteHandler}
                className="text-right bg-red-800 hover:bg-zinc-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
                disabled={tableId.value === ""}
              >
                Kosongkan Meja
              </button>
            </div>
          ) : null}
        </div>
        {isShow ? (
          <div className="overflow-auto p-4">
            <table className="table-auto w-full text-left">
              <thead className="align-stretch text-zinc-400">
                <tr className="border-b">
                  <th className="h-12 px-4 text-right w-[100px]">Jumlah</th>
                  <th className="h-12 px-4 text-left">Menu</th>
                  <th className="h-12 px-4 text-right">Harga</th>
                </tr>
              </thead>
              <tbody>
                {menus
                  ? ordersById?.map((order: Orders, i: number) => {
                      return (
                        <tr key={i} className="border-b">
                          <td className="p-4 text-right">{order.quantity}</td>
                          <td className="p-4 align-middle">
                            {order.menu?.name}
                          </td>
                          <td className="flex justify-end p-4">Gratis</td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>

            <p className="text-center text-gray-500 font mt-5">
              Terima kasih sudah makan di{" "}
              <span className="font-bold">Restoran</span>
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default KasirPage;

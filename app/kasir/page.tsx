"use client";

import React, { useState, useEffect } from "react";
import Select from "react-select";

const KasirPage = () => {
  const [menus, setMenus] = useState<any>(null);
  const [orders, setOrders] = useState<any>(null);
  const [ordersById, setOrdersById] = useState<any>(null);
  const [tableId, setTableId] = useState<any>("");
  const [isShow, setIsShow] = useState<boolean>(false);
  let tableOptions: any[] = [];

  useEffect(() => {
    const localMenus: any = localStorage.getItem("menus");
    const localOrders: any = localStorage.getItem("orders");

    setMenus(JSON.parse(localMenus));
    setOrders(JSON.parse(localOrders));
  }, []);

  const uniqueIds = new Set<string>();

  const newArr = orders?.filter((order: any) => {
    if (!uniqueIds.has(order.tableId)) {
      uniqueIds.add(order.tableId);
      return true;
    }

    return false;
  });

  newArr
    ?.sort((a: any, b: any) => Number(a.tableId) - Number(b.tableId))
    .map((order: any) => {
      tableOptions.push({
        value: order.tableId,
        label: order.tableId,
      });
    });

  const mapMenus = new Map(menus?.map((menu: any) => [menu.id, menu]));

  const joinResult = orders
    ?.filter((order: any) => mapMenus.has(order.menuId))
    .map((order: any) => ({ ...order, menu: mapMenus.get(order.menuId) }));

  const printHandler: any = () => {
    setOrdersById(joinResult.filter((order: any) => order.tableId === tableId));
    setIsShow(true);
  };

  const deleteHandler: any = () => {
    const deleteById = orders?.filter(
      (order: any) => order.tableId !== tableId
    );
    localStorage.setItem("orders", JSON.stringify(deleteById));
    setOrders(deleteById);

    setIsShow(false);
  };

  return (
    <section className="kasir">
      <div className="h-auto min-h-[300px] p-5 rounded-xl bg-slate-100 text-sm">
        <div className="flex justify-between mb-2">
          <div className="flex w-2/4">
            <div className="grow mr-2">
              <p className="mb-2">Meja</p>
              <Select
                options={tableOptions}
                onChange={(e: any) => {
                  setTableId(e.value);
                }}
                placeholder="Nomor Meja"
                instanceId="menu"
              />
            </div>
            <div className=" mt-auto">
              <button
                onClick={printHandler}
                className="text-right bg-zinc-900 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                disabled={tableId === ""}
              >
                Print Struk
              </button>
            </div>
          </div>
          <div className="mt-auto">
            <button
              onClick={deleteHandler}
              className="text-right bg-red-800 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              disabled={tableId === ""}
            >
              Kosongkan Meja
            </button>
          </div>
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
                  ? ordersById?.map((order: any, i: any) => {
                      return (
                        <tr key={i} className="border-b">
                          <td className="p-4 text-right">{order.quantity}</td>
                          <td className="p-4 align-middle">
                            {order.menu.name}
                          </td>
                          <td className="flex justify-end p-4">Gratis</td>
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
        ) : null}
      </div>
    </section>
  );
};

export default KasirPage;

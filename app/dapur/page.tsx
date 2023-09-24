"use client";

import React, { useState, useEffect } from "react";
import { Menus } from "../types/Menus.types";
import { Orders } from "../types/Orders.types";

const DapurPage = () => {
  const [menus, setMenus] = useState<Menus[]>([]);
  const [orders, setOrders] = useState<Orders[]>([]);

  useEffect(() => {
    const localMenus: string | null = localStorage.getItem("menus");
    const localOrders: string | null = localStorage.getItem("orders");

    setMenus(JSON.parse(localMenus || "[]"));
    setOrders(JSON.parse(localOrders || "[]"));
  }, []);

  const mapMenus: Map<string, Menus> = new Map(
    menus.map((menu: Menus) => [menu.id, menu])
  );

  const joinResult: Orders[] = orders
    ?.filter((order: Orders) => mapMenus.has(order.menuId))
    .map((order: Orders) => ({
      ...order,
      menu: mapMenus.get(order.menuId) as Menus,
    }));

  return (
    <section className="dapur">
      <div className="h-auto min-h-[300px] p-5 rounded-xl bg-slate-100 text-sm">
        <div className="order-tables flex px-2">
          <div className="table-one flex-1">
            <p className="text-xl font-medium">Meja 1</p>
            <div className="table-one-orders mt-2">
              {joinResult
                ?.filter((order: Orders) => order.tableId === "1")
                .map((order: Orders, i: number) => {
                  return (
                    <p key={i}>{`${order.quantity}x ${order.menu?.name}`}</p>
                  );
                })}
            </div>
          </div>
          <div className="table-two flex-1">
            <p className="text-xl font-medium">Meja 2</p>
            <div className="table-two-orders mt-2">
              {joinResult
                ?.filter((order: Orders) => order.tableId === "2")
                .map((order: Orders, i: number) => {
                  return (
                    <p key={i}>{`${order.quantity}x ${order.menu?.name}`}</p>
                  );
                })}
            </div>
          </div>
          <div className="table-three flex-1">
            <p className="text-xl font-medium">Meja 3</p>
            <div className="table-three-orders mt-2">
              {joinResult
                ?.filter((order: Orders) => order.tableId === "3")
                .map((order: Orders, i: number) => {
                  return (
                    <p key={i}>{`${order.quantity}x ${order.menu?.name}`}</p>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DapurPage;

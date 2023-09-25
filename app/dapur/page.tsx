"use client";

import React, { useState, useEffect } from "react";
import { Menu } from "../types/Menu.types";
import { Order } from "../types/Order.types";

const DapurPage = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const localMenus: string | null = localStorage.getItem("menus");
    const localOrders: string | null = localStorage.getItem("orders");

    setMenus(JSON.parse(localMenus || "[]"));
    setOrders(JSON.parse(localOrders || "[]"));
  }, []);

  const mapMenus: Map<string | number, Menu> = new Map(
    menus.map((menu: Menu) => [menu.id, menu])
  );

  const joinResult: Order[] = orders
    ?.filter((order: Order) => mapMenus.has(order.menuId))
    .map((order: Order) => ({
      ...order,
      menu: mapMenus.get(order.menuId) as Menu,
    }));

  return (
    <section className="dapur">
      <div className="h-auto min-h-[300px] p-5 rounded-md bg-slate-100 text-sm">
        <div className="order-tables flex px-2">
          <div className="table-one flex-1">
            <p className="text-xl font-medium">Meja 1</p>
            <div className="table-one-orders mt-2 text-gray-500">
              {joinResult
                ?.filter((order: Order) => order.tableId === "1")
                .map((order: Order, i: number) => {
                  return (
                    <p
                      key={i}
                      className="mb-1"
                    >{`${order.quantity}x ${order.menu?.name}`}</p>
                  );
                })}
            </div>
          </div>
          <div className="table-two flex-1">
            <p className="text-xl font-medium">Meja 2</p>
            <div className="table-two-orders mt-2 text-gray-500">
              {joinResult
                ?.filter((order: Order) => order.tableId === "2")
                .map((order: Order, i: number) => {
                  return (
                    <p
                      key={i}
                      className="mb-1"
                    >{`${order.quantity}x ${order.menu?.name}`}</p>
                  );
                })}
            </div>
          </div>
          <div className="table-three flex-1">
            <p className="text-xl font-medium">Meja 3</p>
            <div className="table-three-orders mt-2 text-gray-500">
              {joinResult
                ?.filter((order: Order) => order.tableId === "3")
                .map((order: Order, i: number) => {
                  return (
                    <p
                      key={i}
                      className="mb-1"
                    >{`${order.quantity}x ${order.menu?.name}`}</p>
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

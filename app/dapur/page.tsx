"use client";

import React, { useState, useEffect } from "react";

const DapurPage = () => {
  const [menus, setMenus] = useState<any>([]);
  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    const localMenus: any = localStorage.getItem("menus");
    const localOrders: any = localStorage.getItem("orders");

    setMenus(JSON.parse(localMenus));
    setOrders(JSON.parse(localOrders));
  }, []);

  const mapMenus = new Map(menus.map((menu: any) => [menu.id, menu]));

  const joinResult = orders
    .filter((order: any) => mapMenus.has(order.menuId))
    .map((order: any) => ({ ...order, menu: mapMenus.get(order.menuId) }));

  return (
    <section className="dapur">
      <div className="h-auto min-h-[300px] p-5 rounded-xl bg-slate-100 text-sm">
        <div className="order-tables flex px-2">
          <div className="table-one flex-1">
            <p className="text-xl font-medium">Meja 1</p>
            <div className="table-one-orders mt-2">
              {joinResult
                .filter((res: any) => res.tableId === "1")
                .map((order: any, i: any) => {
                  return (
                    <p key={i}>{`${order.quantity}x ${order.menu.name}`}</p>
                  );
                })}
            </div>
          </div>
          <div className="table-two flex-1">
            <p className="text-xl font-medium">Meja 2</p>
            <div className="table-two-orders mt-2">
              {joinResult
                .filter((res: any) => res.tableId === "2")
                .map((order: any, i: any) => {
                  return (
                    <p key={i}>{`${order.quantity}x ${order.menu.name}`}</p>
                  );
                })}
            </div>
          </div>
          <div className="table-three flex-1">
            <p className="text-xl font-medium">Meja 3</p>
            <div className="table-three-orders mt-2">
              {joinResult
                .filter((res: any) => res.tableId === "3")
                .map((order: any, i: any) => {
                  return (
                    <p key={i}>{`${order.quantity}x ${order.menu.name}`}</p>
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

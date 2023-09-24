import { Menus } from "./Menus.types";

export type Orders = {
  id: string;
  tableId: string;
  menuId: string;
  quantity: number;
  menu?: Menus;
};

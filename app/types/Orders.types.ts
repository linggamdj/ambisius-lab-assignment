import { Menus } from "./Menus.types";

export type Orders = {
  id: string;
  tableId: string;
  menuId: string | number;
  quantity: string | number;
  menu?: Menus;
};

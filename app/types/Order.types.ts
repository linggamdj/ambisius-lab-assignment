import { Menu } from "./Menu.types";

export type Order = {
  id: string;
  tableId: string;
  menuId: string | number;
  quantity: string | number;
  menu?: Menu;
};

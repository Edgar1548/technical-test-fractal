import type { Status } from "@/core/types";

export interface Order {
  id: number;
  order_number: string;
  date: string;
  status: Status;
  total: number;
  products_count?: number;
  products?: OrderProduct[];
}

export interface OrderProduct {
  id: number;
  product_id: number;
  name: string;
  unit_price: number;
  qty: number;
  total_price: number;
}

export interface OrderProductPayload {
  product_id: number;
  qty: number;
}

export interface CreateOrderDTO {
  order_number: string;
  products: OrderProductPayload[];
}

export interface UpdateOrderDTO extends CreateOrderDTO {
  status?: Status;
}

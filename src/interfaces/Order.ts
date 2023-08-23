import { Product } from "./Product";

export interface Order{
    order_id: number;
    payment_status: string;
    total_amount: number;
    order_status: string;
}

export interface OrderItem {
    item_id: number;
    quantity: number;
    subtotal: number;
    product: Product;
    order: Order;

}

export interface OrderProps {
    order: Order
}

export interface OrderItemProps {
    item: OrderItem
}



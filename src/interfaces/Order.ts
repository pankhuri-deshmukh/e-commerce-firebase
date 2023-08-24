//import { Product } from "./Product";

export interface Order{
    order_id: string;
    payment_status: string;
    total_amount: number;
    order_status: string;
}

export interface OrderItem {
    quantity: number,
    subtotal: number,
    price: number,
    itemName: string,
    order_item_id: string,
    order_id: string,
    image: string,

}

export interface OrderProps {
    order: Order
}

export interface OrderItemProps {
    item: OrderItem
}



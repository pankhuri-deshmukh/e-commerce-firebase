import { Product } from "./Product";

export interface Cart {
    cart_id: number;
    total_amount: number;
}

export interface CartItem {
    cart_item_id: number;
    quantity: number;
    subtotal: number;
    product : Product;
    cart : Cart;
  
}

export interface CartItemProps {
    item: CartItem
}
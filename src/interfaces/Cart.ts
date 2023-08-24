//import { Product } from "./Product";

export interface Cart {
    cart_id: number;
    total_amount: number;
}

export interface CartItem {
    cart_id: string;
    itemName: string;
    quantity: number;
    subtotal: number;
    price : number;
    userEmail : string;
    image: string;
    product_id : string;
  
}

export interface CartItemProps {
    item: CartItem
}
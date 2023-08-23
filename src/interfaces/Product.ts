export interface Product {
    product_id: number;
    name: string;
    description: string;
    price: string;
    category: string;
    quantity: number;
    image: string;
  }

export interface ProductCardProps {
    product: Product;
  }

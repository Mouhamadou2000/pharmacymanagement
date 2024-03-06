import { Cart } from "./Cart";
import { Product } from "./products";

export interface CartProduct {
    id: number;
    quantity: number;
    cart: Cart;
    product:Product;
  }

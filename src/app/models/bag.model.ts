import { Product } from './products.model';

export interface ProductInBag extends Product {
  quantity: number;
}

export interface Bag {
  subtotal: number;
  shipping: number;
  total: number;
  products: {
    [id: string]: ProductInBag;
  };
}

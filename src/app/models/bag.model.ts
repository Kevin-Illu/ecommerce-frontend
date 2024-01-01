import { Product } from './products.model';

interface ProductInBag extends Product {
  quantity: number;
}

export interface Bag {
  products: {
    [id: string]: ProductInBag;
  };
}

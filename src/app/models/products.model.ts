export interface Product {
  productCode: string;
  productName: string;
  productDescription: string;
  buyPrice: string;
  quantityInStock: number;
  productScale: string;
  productVendor: string;
  productLine: string;
  MSRP: string;
}

export type Products = Product[];

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/products.model';
import { Bag, ProductInBag } from 'src/app/models/bag.model';

@Injectable({
  providedIn: 'root',
})
export class BagService {
  private bagSubject = new BehaviorSubject<Bag>(this.loadInitialBagState());
  bag$: Observable<Bag> = this.bagSubject.asObservable();

  // UI
  private uiSubject = new BehaviorSubject<any>({
    isBagOpen: false,
  });
  ui$: Observable<any> = this.uiSubject.asObservable();

  private loadInitialBagState(): Bag {
    const storedBag = localStorage.getItem('bag');
    const defaultBag = this.getDefaultBag();
    const parsedBag = storedBag ? JSON.parse(storedBag) : defaultBag;

    return parsedBag;
  }

  private getDefaultBag(): Bag {
    return {
      subtotal: 0,
      shipping: 0,
      total: 0,
      products: {},
    };
  }

  private saveBagToLocalStorage(bag: Bag): void {
    localStorage.setItem('bag', JSON.stringify(bag));
  }

  addToBag(product: Product): void {
    const currentBag = this.bagSubject.value;
    const isProductInBag = currentBag.products[product.productCode];

    const updatedProducts = {
      ...currentBag.products,
      [product.productCode]: {
        ...product,
        quantity: isProductInBag ? isProductInBag.quantity + 1 : 1,
      },
    };

    const updatedBag: Bag = {
      ...currentBag,
      products: updatedProducts,
    };
    this.bagSubject.next(updatedBag);
    this.updateBag();
  }

  removeFromBag(productCode: string): void {
    const currentBag = this.bagSubject.value;
    const { [productCode]: removedProduct, ...updatedProducts } =
      currentBag.products;

    const updatedBag = { ...currentBag, products: updatedProducts };
    this.bagSubject.next(updatedBag);
    this.updateBag();
  }

  getProductsInBag(): ProductInBag[] {
    const currentBag = this.bagSubject.value;
    return Object.values(currentBag.products);
  }

  private calculateSubtotal(bag: Bag): number {
    let subtotal = 0;

    Object.values(bag.products).forEach((product) => {
      subtotal += parseFloat(product.MSRP) * product.quantity;
    });

    return subtotal;
  }

  private calculateShipping(bag: Bag): number {
    let shippingPrice: number = 50; // do something extrange to calculate this xD
    return shippingPrice;
  }

  modifyProductQuantity({
    productCode,
    increase = true,
  }: {
    productCode: string;
    increase?: boolean;
  }): void {
    const currentBag = this.bagSubject.value;
    const existingProduct = currentBag.products[productCode];

    let updatedQuantity = existingProduct.quantity;

    if (increase) {
      updatedQuantity += 1;
    } else {
      updatedQuantity = Math.max(1, updatedQuantity - 1);
    }

    const updatedProducts = {
      ...currentBag.products,
      [productCode]: {
        ...existingProduct,
        quantity: updatedQuantity,
      },
    };

    const updatedBag: Bag = {
      ...currentBag,
      products: updatedProducts,
    };

    this.bagSubject.next(updatedBag);
    this.updateBag();
  }

  private updateBag(): void {
    const bag = this.bagSubject.value;
    const subtotal = parseFloat(this.calculateSubtotal(bag).toFixed(2));
    const shipping = parseFloat(this.calculateShipping(bag).toFixed(2));
    const total = (subtotal + shipping).toFixed(2);

    const updatedBag: Bag = {
      ...bag,
      subtotal,
      shipping,
      total: parseFloat(total),
    };

    this.bagSubject.next(updatedBag);
    this.saveBagToLocalStorage(updatedBag);
  }

  toggleBagSidebar(isOpen: boolean): void {
    const updatedUi = this.uiSubject.value;
    updatedUi.isBagOpen = isOpen;
    this.uiSubject.next(updatedUi);
  }
}

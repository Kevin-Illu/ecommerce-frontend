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

  private loadInitialBagState(): Bag {
    const storedBag = localStorage.getItem('bag');
    const defaultBag: Bag = {
      total: 0,
      subtotal: 0,
      products: {},
    };
    return storedBag ? JSON.parse(storedBag) : defaultBag;
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
    this.saveBagToLocalStorage(updatedBag);
    this.updateTotal();
  }

  removeFromBag(productCode: string): void {
    const currentBag = this.bagSubject.value;
    const { [productCode]: removedProduct, ...updatedProducts } =
      currentBag.products;

    const updatedBag = { ...currentBag, products: updatedProducts };
    this.bagSubject.next(updatedBag);
    this.saveBagToLocalStorage(updatedBag);
    this.updateTotal();
  }

  getProductsInBag(): ProductInBag[] {
    const currentBag = this.bagSubject.value;
    return Object.values(currentBag.products);
  }

  private calculateTotal(bag: Bag): number {
    let total: number = 0;

    Object.values(bag.products).forEach((product) => {
      total += parseFloat(product.MSRP) * product.quantity;
    });

    return total;
  }

  private updateTotal(): void {
    const currentBag = this.bagSubject.value;
    const total = this.calculateTotal(currentBag);

    const updatedBag: Bag = {
      ...currentBag,
      total: total,
    };

    this.bagSubject.next(updatedBag);
    this.saveBagToLocalStorage(updatedBag);
  }
}

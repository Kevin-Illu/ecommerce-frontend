import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/products.model';
import { Bag } from 'src/app/models/bag.model';

@Injectable({
  providedIn: 'root',
})
export class BagService {
  private bagSubject = new BehaviorSubject<Bag>(this.loadInitialBagState());
  bag$: Observable<Bag> = this.bagSubject.asObservable();

  private loadInitialBagState(): Bag {
    const storedBag = localStorage.getItem('bag');
    return storedBag ? JSON.parse(storedBag) : { products: {} };
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

    const updatedBag = { ...currentBag, products: updatedProducts };
    this.bagSubject.next(updatedBag);
    this.saveBagToLocalStorage(updatedBag);
  }

  removeFromBag(productCode: string): void {
    const currentBag = this.bagSubject.value;
    const { [productCode]: removedProduct, ...updatedProducts } =
      currentBag.products;

    const updatedBag = { ...currentBag, products: updatedProducts };
    this.bagSubject.next(updatedBag);
    this.saveBagToLocalStorage(updatedBag);
  }
}

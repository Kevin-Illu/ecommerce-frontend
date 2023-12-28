import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/pages/products/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'https://bmo-store.000webhostapp.com/apps/api/public';
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/products`);
  }
}

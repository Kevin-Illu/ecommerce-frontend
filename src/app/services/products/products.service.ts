import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from 'src/app/models/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'https://bmo-store.000webhostapp.com/apps/api/public';
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Products> {
    return this.httpClient.get<Products>(`${this.baseUrl}/products`);
  }

  getProductDetails(productCode: string): Observable<Products> {
    return this.httpClient.get<Products>(
      `${this.baseUrl}/product/${productCode}`,
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Products } from 'src/app/models/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'https://bmo-store.000webhostapp.com/apps/api/public';
  constructor(private httpClient: HttpClient) { }

  getProducts(): Promise<Products | undefined> {
    return firstValueFrom(this.httpClient.get<Products>(`${this.baseUrl}/products`),
      { defaultValue: undefined });
  }

  getProductDetails(productCode: string): Promise<Products | undefined> {
    return firstValueFrom(this.httpClient.get<Products>(
      `${this.baseUrl}/product/${productCode}`,
    ), { defaultValue: undefined });
  }
}

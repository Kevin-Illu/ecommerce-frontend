import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProductsService } from '../services/products/products.service';
import { Product } from './product';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [NgFor, NgIf],
})
export class ProductList implements OnInit {
  public productList: Product[] = [];

  constructor(private service: ProductsService) {}

  ngOnInit() {
    this.service.getProducts().subscribe((response) => {
      this.productList = response;
    });
  }
}

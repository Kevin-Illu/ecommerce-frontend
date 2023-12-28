import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from './product';

@Component({
  standalone: true,
  selector: 'products-page',
  templateUrl: './products-page.component.html',
  imports: [NgFor, NgIf, RouterModule],
})
export class ProductsPage implements OnInit {
  public productList: Product[] = [];

  constructor(private service: ProductsService) {}

  ngOnInit() {
    this.service.getProducts().subscribe((response: Product[]) => {
      this.productList = response;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import { Products } from 'src/app/models/products.model';

@Component({
  standalone: true,
  selector: 'products-page',
  styleUrls: ['./products-page.component.css'],
  templateUrl: './products-page.component.html',
  imports: [NgFor, NgIf, RouterModule],
})
export class ProductsPage implements OnInit {
  public productsList: Products = [];
  public results: number = 0;

  constructor(private service: ProductsService) {}

  ngOnInit() {
    this.service.getProducts().subscribe((response: Products) => {
      this.productsList = response;
      this.results = response.length;
    });
  }
}

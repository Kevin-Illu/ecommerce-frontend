import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product, Products } from 'src/app/models/products.model';
import { BagService } from 'src/app/services/bag/bag.service';

@Component({
  standalone: true,
  selector: 'products-page',
  styleUrls: ['./products.page.css'],
  templateUrl: './products.page.html',
  imports: [NgFor, NgIf, RouterModule],
})
export class ProductsPage implements OnInit {
  public productsList: Products = [];
  public results: number = 0;
  public uiText = {
    addToBagBtn: {
      text: 'quick add',
    },
  };

  constructor(
    private service: ProductsService,
    private bagService: BagService,
  ) {}

  ngOnInit() {
    this.service.getProducts().subscribe((response: Products) => {
      this.productsList = response;
      this.results = response.length;
    });
  }

  quickAdd(e: Event, product: Product) {
    e.stopPropagation();
    e.preventDefault();

    this.bagService.addToBag(product);
    this.uiText.addToBagBtn.text = 'added';

    setTimeout(() => {
      this.uiText.addToBagBtn.text = 'quick add';
    }, 1000);
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { Product, Products } from 'src/app/models/products.model';

@Component({
  standalone: true,
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  imports: [NgIf],
})
export class ProductDetailPage implements OnInit {
  public product!: Product;

  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const productCode = params['code'];
      this.service
        .getProductDetails(productCode)
        .subscribe((product: Products) => {
          this.product = product[0];
        });
    });
  }
}

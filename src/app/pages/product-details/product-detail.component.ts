import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { Product } from 'src/app/models/products.model';
import { BagService } from 'src/app/services/bag/bag.service';

@Component({
  standalone: true,
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  imports: [NgIf, RouterModule],
})
export class ProductDetailPage implements OnInit {
  public product: Product | undefined;
  public isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
    private bagService: BagService,
  ) { }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const productCode = params['code'];

      this.service
        .getProductDetails(productCode)
        .then((products) => {
          this.product = Array.isArray(products) ? products[0] : undefined;
          this.isLoading = false;
        });
    });
  }

  addToBag(p: Product) {
    this.bagService.addToBag(p);
    this.bagService.toggleBagSidebar(true);
  }
}

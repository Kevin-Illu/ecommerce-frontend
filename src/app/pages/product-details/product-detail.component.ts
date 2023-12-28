import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from '../products/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailPage implements OnInit {
  private product!: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService,
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const productCode = params['code'];
      console.log(productCode);

      if (!productCode) {
        this.router.navigate(['/products']);
      }

      this.service
        .getProductDetails(productCode)
        .subscribe((details: Product) => {
          this.product = details;
        });
    });
  }
}

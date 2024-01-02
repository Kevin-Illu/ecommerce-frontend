import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bag, ProductInBag } from 'src/app/models/bag.model';
import { MaterialModule } from 'src/app/modules/material.module';
import { BagService } from 'src/app/services/bag/bag.service';

@Component({
  standalone: true,
  selector: 'bag-component',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.css'],
  imports: [NgIf, NgFor, MaterialModule, NgClass],
})
export class BagComponent implements OnInit {
  public products: ProductInBag[] = this.service.getProductsInBag();
  public bag!: Bag;
  private bagSubscription: Subscription | undefined;

  private uiSubscription: Subscription | undefined;
  public ui = {
    isBagOpen: false,
  };

  constructor(private service: BagService) {}

  ngOnInit(): void {
    this.bagSubscription = this.service.bag$.subscribe((bag) => {
      this.bag = bag;
      this.products = this.service.getProductsInBag();
    });

    this.uiSubscription = this.service.ui$.subscribe(({ isBagOpen }) => {
      this.ui.isBagOpen = isBagOpen;
    });
  }

  ngOnDestroy(): void {
    if (this.bagSubscription) {
      this.bagSubscription.unsubscribe();
    }
  }

  closeBagSidebar(): void {
    this.service.closeBagSidebar();
  }

  openBagSidebar(): void {
    this.service.openBagSidebar();
  }
}

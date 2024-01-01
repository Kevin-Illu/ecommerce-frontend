import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  constructor(private service: BagService) {}
  ngOnInit(): void {
    this.service.bag$.subscribe((bag) => {
      this.bag = bag;
      this.products = this.service.getProductsInBag();
    });
  }
}

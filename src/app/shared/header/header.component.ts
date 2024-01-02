import { Component, OnInit } from '@angular/core';
import { BagService } from 'src/app/services/bag/bag.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public productsInBag: number = 0;
  constructor(private bagService: BagService) {}
  ngOnInit(): void {
    this.bagService.bag$.subscribe((bag) => {
      this.productsInBag = Object.keys(bag.products).length;
    });
  }

  openSidebar(): void {
    this.bagService.toggleBagSidebar(true);
  }
}

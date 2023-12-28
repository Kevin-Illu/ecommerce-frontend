import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailPage } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailPage;
  let fixture: ComponentFixture<ProductDetailPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailPage],
    });
    fixture = TestBed.createComponent(ProductDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

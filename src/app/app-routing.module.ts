import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.component';
import { ProductDetailPage } from './pages/product-details/product-detail.component';
import { ProductsPage } from './pages/products/products-page.component';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'products', component: ProductsPage },
  {
    path: 'product/:code',
    component: ProductDetailPage,
  },
  { path: '**', component: HomePage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

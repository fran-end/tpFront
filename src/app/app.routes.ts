import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  { path: '', component: ProductsComponent },
  {
    path: 'deseados',
    loadComponent: () => import('./wishlist/wishlist.component').then(m => m.WishlistComponent)
  }
];

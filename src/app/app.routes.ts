import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  { path: '', component: ProductsComponent },
  {
    path: 'deseados',
    loadComponent: () => import('./wishlist/wishlist.component').then(m => m.WishlistComponent)
  },
  {
        path: 'detalle-product/:id',
        loadComponent: () => import('./detalle-product/detalle-product.component').then(m => m.DetalleProductComponent)
    },
    {
        path: 'products',
        loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent)
    },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: '**', redirectTo: '/products' }  
];

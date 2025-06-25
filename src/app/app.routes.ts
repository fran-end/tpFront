import { Routes } from '@angular/router';

export const routes: Routes = [
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
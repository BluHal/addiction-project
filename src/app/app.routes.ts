import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/product-list/product-list.component').then(
        (c) => c.ProductListComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/create-edit-product/create-edit-product.component').then(
        (c) => c.CreateEditProductComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/create-edit-product/create-edit-product.component').then(
        (c) => c.CreateEditProductComponent
      ),
  },
];

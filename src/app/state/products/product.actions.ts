import { createAction, props } from '@ngrx/store';
import { Product } from '../../interfaces/product.interface';

export const addProduct = createAction(
  '[Product Page] Add Product',
  props<{ content: Product }>()
);

export const deleteProduct = createAction(
  '[Product Page] Delete Product',
  props<{ id: string }>()
);

export const updateProduct = createAction(
  '[Product Page] Update Product',
  props<{ productToUpdate: Product }>()
);

export const loadProductById = createAction(
  '[Product Page] load Product By Id',
  props<{ id: string }>()
);

export const loadProductByIdSuccess = createAction(
  '[Product Page] load Product By Id Success',
  props<{ product: Product | null }>()
);

export const loadProductByIdFailure = createAction(
  '[Product Page] Load Product By Id Failure',
  props<{ error: string }>()
);

export const loadProducts = createAction('[Product Page] Load Products');

export const loadProductsSuccess = createAction(
  '[Product Page] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Product Page] Load Products Failure',
  props<{ error: Error }>()
);

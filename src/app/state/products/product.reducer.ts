import { createReducer, on } from '@ngrx/store';
import { Product } from '../../interfaces/product.interface';
import {
  addProduct,
  deleteProduct,
  loadProductById,
  loadProductByIdFailure,
  loadProductByIdSuccess,
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
  updateProduct,
} from './product.actions';

export interface ProductState {
  products: Product[];
  productToEdit: Product | null;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initalState: ProductState = {
  products: [],
  productToEdit: null,
  error: null,
  status: 'pending' as const,
};

export const productReducer = createReducer(
  initalState,

  on(addProduct, (state, { content }) => ({
    ...state,
    products: [
      ...state.products,
      {
        id: Date.now().toString(),
        name: content.name,
        price: content.price,
        description: content.description,
      },
    ],
  })),

  on(deleteProduct, (state, { id }) => ({
    ...state,
    products: state.products.filter((product) => product.id !== id),
  })),

  on(updateProduct, (state, { productToUpdate }) => ({
    ...state,
    products: state.products.map((product) => {
      return product.id === productToUpdate.id ? productToUpdate : product;
    }),
    productToEdit: null,
  })),

  on(loadProductById, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(loadProductByIdSuccess, (state, { product }) => ({
    ...state,
    status: 'success' as const,
    productToEdit: product,
  })),

  on(loadProductByIdFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as const,
  })),

  on(loadProducts, (state) => ({
    ...state,
    status: 'loading' as const,
    productToEdit: null,
  })),

  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    error: null,
    status: 'success' as const,
  })),

  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    error: error.message,
    status: 'error' as const,
  }))
);

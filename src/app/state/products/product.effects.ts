import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  from,
  map,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { AppState } from '../app.state';
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
import { selectAllProducts } from './product.selectors';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() =>
        this.productService.getProducts().pipe(
          map((products) => loadProductsSuccess({ products })),
          catchError((error: Error) => of(loadProductsFailure({ error })))
        )
      )
    )
  );

  loadProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductById),
      switchMap(({ id }) =>
        from(this.productService.getProductById(id)).pipe(
          map((product: Product | null) => loadProductByIdSuccess({ product })),
          catchError((error) => of(loadProductByIdFailure({ error })))
        )
      )
    )
  );

  addProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addProduct, deleteProduct),
        withLatestFrom(this.store.select(selectAllProducts)),
        switchMap(([action, products]) =>
          from(this.productService.saveProducts(products))
        )
      ),
    { dispatch: false }
  );

  updateProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateProduct),
        withLatestFrom(this.store.select(selectAllProducts)),
        switchMap(([action, products]) =>
          from(this.productService.updateProduct(action.productToUpdate, products))
        ),
      ),
    { dispatch: false }
  );
}

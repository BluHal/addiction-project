import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { loadProducts } from '../../state/products/product.actions';
import { selectAllProducts } from '../../state/products/product.selectors';
import { PRODUCT_LIST_DEPS } from './product-list.dependencies';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [PRODUCT_LIST_DEPS],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  public products$ = this.store.select(selectAllProducts);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }
}

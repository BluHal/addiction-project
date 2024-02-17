import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../interfaces/product.interface';
import { AppState } from '../../state/app.state';
import { deleteProduct } from '../../state/products/product.actions';
import { PRODUCT_DEPENDENCIES } from './product.dependecies';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [PRODUCT_DEPENDENCIES],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product: Product | null = null;

  constructor(private store: Store<AppState>) {}

  public onDeleteBtnClick(): void {
    const id = this.product?.id;
    if (!this.product || !id) return;

    this.store.dispatch(deleteProduct({ id }));
  }
}

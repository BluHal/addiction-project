import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../interfaces/product.interface';
import { AppState } from '../../state/app.state';
import {
  addProduct,
  loadProductById,
  updateProduct,
} from '../../state/products/product.actions';
import { CREATE_EDIT_PRODUCT_DEPS } from './create-edit-product.dependencies';

@Component({
  selector: 'app-create-edit-product',
  standalone: true,
  imports: [CREATE_EDIT_PRODUCT_DEPS],
  templateUrl: './create-edit-product.component.html',
  styleUrl: './create-edit-product.component.scss',
})
export class CreateEditProductComponent implements OnInit, OnDestroy {
  public productForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    price: new FormControl<number>(0, Validators.required),
    description: new FormControl<string>('', Validators.required),
  });

  private productId: string | null = null;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap) => {
        const id = params.get('id');
        if (!id) return;
        this.store.dispatch(loadProductById({ id }));
      });

    this.store
      .select((state) => state.products.productToEdit)
      .pipe(takeUntil(this.destroy$))
      .subscribe((product) => {
        if (!product) return;
        this.productForm.setValue({
          name: product.name,
          price: product.price,
          description: product.description,
        });

        if (product.id) this.productId = product.id;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public onSubmit(): void {
    if (!this.productForm.valid) return;

    const product: Product = <Product>this.productForm.value;

    if (this.productId) {
      product.id = this.productId;
      this.store.dispatch(updateProduct({ productToUpdate: product }));
    } else {
      this.store.dispatch(addProduct({ content: product }));
    }
    this.router.navigateByUrl('/');
  }
}

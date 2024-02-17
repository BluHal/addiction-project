import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ProductComponent } from '../../components/product/product.component';
import { FloatingBtnComponent } from '../../components/floating-btn/floating-btn.component';

export const PRODUCT_LIST_DEPS = [
  AsyncPipe,
  RouterModule,
  MatButtonModule,
  MatIconModule,
  ProductComponent,
  FloatingBtnComponent,
];

import { ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FloatingBtnComponent } from '../../components/floating-btn/floating-btn.component';

export const CREATE_EDIT_PRODUCT_DEPS = [
  RouterModule,
  ReactiveFormsModule,
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  FloatingBtnComponent
];

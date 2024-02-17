import { Component, Input } from '@angular/core';
import { FLOATING_BTN_DEPS } from './floating-btn.dependencies';

@Component({
  selector: 'app-floating-btn',
  standalone: true,
  imports: [FLOATING_BTN_DEPS],
  templateUrl: './floating-btn.component.html',
  styleUrl: './floating-btn.component.scss',
})
export class FloatingBtnComponent {
  @Input() route: string = '';
  @Input() icon: string = '';
}

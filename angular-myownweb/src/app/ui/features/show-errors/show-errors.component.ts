import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-errors',
  standalone: true,
  imports: [],
  templateUrl: './show-errors.component.html',
  styleUrl: './show-errors.component.css'
})
export class ShowErrorsComponent {
  @Input({required: true})
  errors!: string[];
}

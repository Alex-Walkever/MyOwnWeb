import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-show-errors',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './show-errors.component.html',
  styleUrl: './show-errors.component.css'
})
export class ShowErrorsComponent {
  @Input({required: true})
  errors!: string[];

  @Input()
  errorNeedToTranslate: boolean = false;
}

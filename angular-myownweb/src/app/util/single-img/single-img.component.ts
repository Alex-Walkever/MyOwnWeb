import { Component, EventEmitter, Input, Output} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-single-img',
  standalone: true,
  imports: [MatButtonModule, TranslateModule],
  templateUrl: './single-img.component.html',
  styleUrl: './single-img.component.css'
})
export class SingleImgComponent {
  @Input({required: true})
  src!: string;

  @Input({required: true})
  width!: string; 

  @Input({required: true})
  height!: string;

  @Input({required: true})
  id!: number;

  @Output()
  remove = new EventEmitter<number>();

  removeImg()
  {
    this.remove.emit(this.id);
  }
}

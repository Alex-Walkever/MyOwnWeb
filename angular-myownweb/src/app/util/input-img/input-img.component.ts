import { Component, EventEmitter, Input, Output } from '@angular/core';
import { toBase64 } from '../utility-functions';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { SingleImgComponent } from "../single-img/single-img.component";

@Component({
  selector: 'app-input-img',
  standalone: true,
  imports: [TranslateModule, MatButtonModule, SingleImgComponent],
  templateUrl: './input-img.component.html',
  styleUrl: './input-img.component.css'
})
export class InputImgComponent {
  @Input({ required: true })
  title!: string;

  @Input()
  urlCurrentsImages?: string[];

  @Output()
  selectedFiles = new EventEmitter<FileList>()

  base64Images: string[] = [];

  change(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      for (let index = 0; index < input.files.length; index++) {
        const file = input.files[index];
        toBase64(file).then((value: string) => this.base64Images.push(value)).catch(error => console.log(error));
      }

      this.selectedFiles.emit(input.files);
      this.urlCurrentsImages = undefined;
    }
  }

  remove(id: number) {
    if (this.base64Images !== undefined) {
      this.base64Images.splice(id, 1);
    }

    if (this.urlCurrentsImages !== undefined) {
      this.urlCurrentsImages.splice(id, 1);
    }
  }
}



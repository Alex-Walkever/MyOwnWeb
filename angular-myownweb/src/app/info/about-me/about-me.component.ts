import { Component, inject } from '@angular/core';
import { getTranslation } from '../../tools/utility-functions';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {
  test!:string;
  translate = inject(TranslateService);
  testString(str: string){
    this.test = getTranslation(str, this.translate);
  }
}

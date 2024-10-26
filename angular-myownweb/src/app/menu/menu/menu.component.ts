import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UrlStrings } from '../../tools/url-strings';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbarModule, TranslateModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  translate = inject(TranslateService);
  urlStrings = UrlStrings;

  constructor() {
    
  }

  translateText(lang: string){
    this.translate.use(lang);
    localStorage.setItem("lang", lang);
  }
}

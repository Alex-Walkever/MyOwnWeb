import { Component, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuComponent } from "./menu/menu/menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  translateService = inject(TranslateService);
  matIconRegistry = inject(MatIconRegistry);

  constructor() {
    var lang = localStorage.getItem("lang");
    if (lang) {
      this.translateService.use(lang!.toString());
    }
  }
}

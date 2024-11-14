import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxGlobalEventsService } from 'ngx-global-events';
import { GlobalsEventsStrings, LocalStorageStrings } from '../../../util/utility-strings';
import { MatButton } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';


export interface Tile {
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-footer-menu',
  standalone: true,
  imports: [MatIconModule, TranslateModule, MatButton, MatProgressBarModule, MatGridListModule],
  templateUrl: './footer-menu.component.html',
  styleUrl: './footer-menu.component.css'
})
export class FooterMenuComponent {
  private globalEventsService = inject(NgxGlobalEventsService);
  translateService = inject(TranslateService);

  tiles: Tile[] = [
    {cols: 3, rows: 1},
    {cols: 1, rows: 2},
    {cols: 1, rows: 1},
    {cols: 2, rows: 1},
  ];

  constructor() {
    var lang = localStorage.getItem(LocalStorageStrings.language);
    if (lang) {
      this.translateText(lang!.toString());
    }
  }

  translateText(lang: string) {
    this.translateService.use(lang);
    this.translateService.setDefaultLang(lang);
    localStorage.setItem(LocalStorageStrings.language, lang);
    this.globalEventsService.emit(GlobalsEventsStrings.changeLenguage);
  }
}
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UrlStrings } from '../../tools/utility-strings';
import { timer } from 'rxjs';
import { CommonModule } from '@angular/common';
import { transform } from 'typescript';
import { AnimationShowAndHide, globalAnimationShowAndHide } from '../../tools/utility-functions';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbarModule, TranslateModule, MatButtonModule, MatIconModule, RouterLink, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  ngOnInit(): void {
    this.animatedShow = [{
      htmlElement: <HTMLElement>document.querySelector(".matToolBar"),
      transalteYStrat: "-100%",
      transalteYEnd: "0",
      duration: 1000,
      interations: 1
    }];
    this.animatedHide = [{
      htmlElement: <HTMLElement>document.querySelector(".matToolBar"),
      transalteYStrat: "0",
      transalteYEnd: "-100%",
      duration: 1000,
      interations: 1
    }];
  }
  translate = inject(TranslateService);
  urlStrings = UrlStrings;

  translateText(lang: string) {
    this.translate.use(lang);
    this.translate.setDefaultLang(lang);
    localStorage.setItem("lang", lang);
  }

  animatedShow!: AnimationShowAndHide[];
  animatedHide!: AnimationShowAndHide[];

  show() {
    globalAnimationShowAndHide(this.animatedShow);
  }

  hide() {
    globalAnimationShowAndHide(this.animatedHide)
  }
}

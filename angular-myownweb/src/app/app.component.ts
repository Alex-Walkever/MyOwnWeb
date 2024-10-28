import { Component, inject, input, OnInit, ViewChild } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuComponent } from "./menu/menu/menu.component";
import { BehaviorSubject, debounceTime, timer } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { globalAnimationShowAndHide, AnimationShowAndHide } from './tools/utility-functions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, MatIconModule, MatButtonModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  translateService = inject(TranslateService);
  matIconRegistry = inject(MatIconRegistry);
  router = inject(Router);

  constructor() {
    var lang = localStorage.getItem("lang");
    if (lang) {
      this.translateService.use(lang!.toString());
    }
  }

  @ViewChild(MenuComponent)
  child: MenuComponent | undefined;

  ngOnInit(): void {
    this.animatedShow = [{
      htmlElement: <HTMLElement>document.querySelector(".dowArrow"),
      transalteYStrat: "-200%",
      transalteYEnd: "0",
      duration: 1000,
      interations: 1
    }, {
      htmlElement: <HTMLElement>document.querySelector(".container"),
      transalteYStrat: "-15%",
      transalteYEnd: "0",
      duration: 1000,
      interations: 1
    }];

    this.animatedHide = [{
      htmlElement: this.animatedShow[0].htmlElement,
      transalteYStrat: "0",
      transalteYEnd: "-200%",
      duration: 1000,
      interations: 1
    }, {
      htmlElement: this.animatedShow[1].htmlElement,
      transalteYStrat: "0",
      transalteYEnd: "-15%",
      duration: 1000,
      interations: 1
    }];

    this.router.events.subscribe(()=>{
      this.timerBehavior.next();
    });
  }

  waitTime = 10000;
  timerBehavior = new BehaviorSubject<void>(undefined);
  timerPipe = this.timerBehavior.pipe(debounceTime(this.waitTime));
  timerSubscribe = this.timerPipe.subscribe(() => {
    this.hide();
  });

  animatedShow!: AnimationShowAndHide[];
  animatedHide!: AnimationShowAndHide[];
  clickable: boolean = true;



  show() {
    globalAnimationShowAndHide(this.animatedShow);
    this.child?.show();

    this.clickable = true;
    this.timerBehavior.next();
  }


  hide() {
    globalAnimationShowAndHide(this.animatedHide);
    this.child?.hide();
    this.clickable = false;
  }

  translateText(lang: string) {
    this.translateService.use(lang);
    this.translateService.setDefaultLang(lang);
    localStorage.setItem("lang", lang);
  }
}

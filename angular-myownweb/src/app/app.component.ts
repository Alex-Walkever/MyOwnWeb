import { Component, inject, input, OnInit, ViewChild } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuComponent } from "./menu/menu/menu.component";
import { timer } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { globalAnimationShowAndHide, AnimationShowAndHide } from './tools/utility-functions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, MatIconModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  translateService = inject(TranslateService);
  matIconRegistry = inject(MatIconRegistry);

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

    //this.show();
    //this.child?.show();
    this.secondsCounter.subscribe(() => {
      this.hide();
    });
  }

  time = 2000;
  secondsCounter = timer(this.time);

  animatedShow!: AnimationShowAndHide[];
  animatedHide!: AnimationShowAndHide[];


  show() {
    globalAnimationShowAndHide(this.animatedShow);
    this.child?.show();

    this.secondsCounter = timer(this.time);
    this.secondsCounter.subscribe(() => {
      this.hide();
    });
  }


  hide() {
    globalAnimationShowAndHide(this.animatedHide);
    this.child?.hide();
  }


}

import { Component, inject, input, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MenuComponent } from "./ui/features/menu/menu.component";
import { BehaviorSubject, debounceTime } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { AnimationShowAndHide, globalAnimationShowAndHide } from './util/utility-functions';
import { FooterMenuComponent } from './ui/features/footer-menu/footer-menu.component';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, MatButtonModule, TranslateModule, FooterMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  matIconRegistry = inject(MatIconRegistry);
  router = inject(Router);

  @ViewChild(MenuComponent)
  child: MenuComponent | undefined;

  constructor(private titleService: Title){
    titleService.setTitle(environment.webTitle);
  }

  ngOnInit(): void {
    this.animatedShow = [{
      htmlElement: <HTMLElement>document.querySelector(".dowArrow"),
      transalteYStrat: "-200%",
      transalteYEnd: "0",
      duration: 1000,
      interations: 1
    }, {
      htmlElement: <HTMLElement>document.querySelector(".container"),
      transalteYStrat: "-5%",
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
      transalteYEnd: "-5%",
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
    // this.hide();
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
}

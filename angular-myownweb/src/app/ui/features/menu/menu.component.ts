import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UrlStrings } from '../../../util/utility-strings';
import { CommonModule } from '@angular/common';
import { AnimationShowAndHide, globalAnimationShowAndHide } from '../../../util/utility-functions';
import { AuthorizationComponent } from '../../pages/authorization-page/authorization/authorization.component';
import { SecurityService } from '../../../api/services/security.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbarModule, TranslateModule, MatButtonModule, MatIconModule, RouterLink, CommonModule, AuthorizationComponent],
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

  urlStrings = UrlStrings;

  securityService = inject(SecurityService);  

  animatedShow!: AnimationShowAndHide[];
  animatedHide!: AnimationShowAndHide[];

  show() {
    globalAnimationShowAndHide(this.animatedShow);
  }

  hide() {
    globalAnimationShowAndHide(this.animatedHide)
  }
}

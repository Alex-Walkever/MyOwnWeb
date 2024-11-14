import { Component } from '@angular/core';
import { AuthorizationComponent } from "../../authorization-page/authorization/authorization.component";
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';
import { UrlStrings, UserRolStrings } from '../../../../util/utility-strings';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-main-control-panel',
  standalone: true,
  imports: [AuthorizationComponent, MatGridListModule, MatButtonModule, RouterLink, TranslateModule, MatIconModule, MatCardModule],
  templateUrl: './main-control-panel.component.html',
  styleUrl: './main-control-panel.component.css'
})
export class MainControlPanelComponent {
  constructor() {
    this.breakpoint = (window.innerWidth <= 1300) ? 1 : this.maxCols;
  }

  userRole = UserRolStrings;
  urlStrings = UrlStrings;
  routerLink = RouterLink;
  breakpoint: number;
  maxCols:number = 2; 

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 1300) ? 1 : this.maxCols;
  }
}

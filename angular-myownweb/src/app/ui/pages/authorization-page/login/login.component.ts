import { Component, inject } from '@angular/core';
import { SecurityService } from '../../../../api/services/security.service';
import { Router, RouterLink } from '@angular/router';
import {  UserCredentialsEmailDTO, UserCredentialsUsernameDTO } from '../../../../api/dtos/authorization-dtos';
import { extractErrorsEntity, addTagToErrors } from '../../../../util/utility-functions';
import { TranslateModule } from '@ngx-translate/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { UrlStrings } from '../../../../util/utility-strings';
import { MatButtonModule } from '@angular/material/button';
import { AuthorizationFormRegistrationComponent } from '../authorization-form-registration/authorization-form-registration.component';
import { AuthorizationFormLoginComponent } from "../authorization-form-login/authorization-form-login.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslateModule, MatGridListModule, RouterLink, MatButtonModule, AuthorizationFormLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  securityService = inject(SecurityService);
  router = inject(Router);
  errors: string[] = [];
  breakpoint: number;
  urlStrings = UrlStrings;

  constructor() {
    this.breakpoint = (window.innerWidth <= 1300) ? 1 : 2;
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 1300) ? 1 : 2;
  }

  loginUsername(credentials: UserCredentialsUsernameDTO) {
    this.securityService.loginUsername(credentials).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: err => {
        let errors = extractErrorsEntity(err);
        this.errors = addTagToErrors(errors, "authorization.err.");
      }
    })
  }

  loginEmail(credentials: UserCredentialsEmailDTO) {
    this.securityService.loginEmail(credentials).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: err => {
        let errors = extractErrorsEntity(err);
        this.errors = addTagToErrors(errors, "authorization.err.");
      }
    })
  }
}

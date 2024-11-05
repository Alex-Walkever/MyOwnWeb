import { Component, inject } from '@angular/core';
import { SecurityService } from '../../../../api/services/security.service';
import { Router, RouterLink } from '@angular/router';
import { UserCredentialsDTO } from '../../../../api/dtos/authorization-dtos';
import { extractErrorsEntity } from '../../../../util/utility-functions';
import { AuthorizationFormComponent } from "../authorization-form/authorization-form.component";
import { TranslateModule } from '@ngx-translate/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { UrlStrings } from '../../../../util/utility-strings';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthorizationFormComponent, TranslateModule, MatGridListModule, RouterLink, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  securityService = inject(SecurityService);
  router = inject(Router);
  errors: string[] = [];
  breakpoint: number;
  urlStrings = UrlStrings;

  constructor(){
    this.breakpoint = (window.innerWidth <= 1300) ? 1 : 2;
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 1300) ? 1 : 2;
  }

  login(credentials: UserCredentialsDTO) {
    this.securityService.login(credentials).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: err => {
        const errors = extractErrorsEntity(err);
        this.errors = errors;
      }
    })
  }
}

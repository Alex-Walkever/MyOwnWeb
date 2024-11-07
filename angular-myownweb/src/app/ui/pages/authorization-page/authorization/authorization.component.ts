import { Component, inject, Input } from '@angular/core';
import { SecurityService } from '../../../../api/services/security.service';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.css'
})
export class AuthorizationComponent {
  securityService = inject(SecurityService);

  @Input()
  rol?: string;

  isAuthorized(): boolean {
    if (this.rol) {
      return this.securityService.getRol() === this.rol;
    }
    else {
      return this.securityService.isLogin();
    }
  }
}

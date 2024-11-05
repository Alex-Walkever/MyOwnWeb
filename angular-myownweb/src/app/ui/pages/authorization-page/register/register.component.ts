import { Component, inject } from '@angular/core';
import { AuthorizationFormComponent } from "../authorization-form/authorization-form.component";
import { SecurityService } from '../../../../api/services/security.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthorizationFormComponent, TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  securityService = inject(SecurityService);
  router = inject(Router);

  errors: string[] = [];
}

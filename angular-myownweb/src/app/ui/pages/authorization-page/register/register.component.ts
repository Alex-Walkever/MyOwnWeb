import { Component, inject } from '@angular/core';
import { AuthorizationFormRegistrationComponent } from "../authorization-form-registration/authorization-form-registration.component";
import { SecurityService } from '../../../../api/services/security.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { addTagToErrors, extractErrorsEntity } from '../../../../util/utility-functions';
import { UserCredentialsDTO } from '../../../../api/dtos/authorization-dtos';
import { ShowErrorsComponent } from "../../../features/show-errors/show-errors.component";
import { TabTitleComponent } from "../../../../util/tab-title/tab-title.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthorizationFormRegistrationComponent, TranslateModule, TabTitleComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  securityService = inject(SecurityService);
  router = inject(Router);

  errors: string[] = [];

  saveChanges(userCredentials: UserCredentialsDTO){
    this.securityService.register(userCredentials).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        let errors = extractErrorsEntity(err);
        this.errors = errors;
        addTagToErrors(errors, "authorization.err.");
      }
    })
  }
}

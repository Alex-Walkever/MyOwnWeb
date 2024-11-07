import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { getTranslation } from '../../../../util/utility-functions';
import { UserCredentialsDTO } from '../../../../api/dtos/authorization-dtos';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ErrorsStrings, UrlStrings } from '../../../../util/utility-strings';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { ShowErrorsComponent } from '../../../features/show-errors/show-errors.component';

@Component({
  selector: 'app-authorization-form-registration',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatButtonModule, MatInputModule, ShowErrorsComponent, TranslateModule],
  templateUrl: './authorization-form-registration.component.html',
  styleUrl: './authorization-form-registration.component.css'
})
export class AuthorizationFormRegistrationComponent {
  private formBuilder = inject(FormBuilder);
  private translate = inject(TranslateService);
  urlStrings = UrlStrings;

  form = this.formBuilder.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
    username: ['', { validators: [Validators.required] }],
    password: ['', { validators: [Validators.required] }]
  })

  @Input({ required: true })
  title!: string;

  @Input()
  errors: string[] = [];

  @Output()
  formPost = new EventEmitter<UserCredentialsDTO>();

  getErrorEmail():string{
    let email = this.form.controls.email;

    if(email.hasError("required")){
      return getTranslation("authorization.err.email.required", this.translate);
    }

    if(email.hasError("email")){
      return getTranslation("authorization.err.email.valid", this.translate);
    }

    return '';
  }

  getErrorUsername():string{
    let username = this.form.controls.email;

    if(username.hasError("required")){
      return getTranslation("authorization.err.username.required", this.translate);
    }

    if(username.hasError(ErrorsStrings.usernamePicked)){
      return getTranslation("authorization.err.username.picked", this.translate);
    }

    return '';
  }

  getErrorPassword():string{
    let password = this.form.controls.email;

    if(password.hasError("required")){
      return getTranslation("authorization.err.password", this.translate);
    }
    return '';
  }

  saveChanges(){
    if(!this.form.valid){
      return;
    }

    const credentials = this.form.value as UserCredentialsDTO;
    this.formPost.emit(credentials);
  }

}

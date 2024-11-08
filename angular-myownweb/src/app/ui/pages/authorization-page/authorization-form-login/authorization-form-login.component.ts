import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserCredentialsEmailDTO, UserCredentialsUsernameDTO } from '../../../../api/dtos/authorization-dtos';
import { validateEmail } from '../../../../util/utility-functions';
import { UrlStrings } from '../../../../util/utility-strings';
import { ShowErrorsComponent } from '../../../features/show-errors/show-errors.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-authorization-form-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatButtonModule, MatInputModule, ShowErrorsComponent, TranslateModule, MatIconModule],
  templateUrl: './authorization-form-login.component.html',
  styleUrl: './authorization-form-login.component.css'
})
export class AuthorizationFormLoginComponent {
  private formBuilder = inject(FormBuilder);
  urlStrings = UrlStrings;

  form = this.formBuilder.group({
    value: ['', { validators: [Validators.required] }],
    password: ['', { validators: [Validators.required] }]
  })

  @Input({ required: true })
  title!: string;

  @Input()
  errors: string[] = [];

  @Output()
  usernameLoginPost = new EventEmitter<UserCredentialsUsernameDTO>();

  @Output()
  emailLoginPost = new EventEmitter<UserCredentialsEmailDTO>();

  hide = signal(true);
  
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  saveChanges(){
    if(!this.form.valid){
      return;
    }

    if(validateEmail(this.form.controls.value.getRawValue()!))
    {
      var credentialsUser: UserCredentialsEmailDTO = {email: this.form.controls.value.getRawValue()!, password: this.form.controls.password.getRawValue()!};
      this.emailLoginPost.emit(credentialsUser);

    }else{
      var credentialsEmail: UserCredentialsUsernameDTO = {username: this.form.controls.value.getRawValue()!, password: this.form.controls.password.getRawValue()!};
      this.usernameLoginPost.emit(credentialsEmail);
    }
  }
}

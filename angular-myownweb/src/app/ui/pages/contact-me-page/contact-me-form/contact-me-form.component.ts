import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MinMessageLength } from '../../../../util/utility-variables';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ContactMeCreationDTO } from '../../../../api/dtos/contact-me-dtos';
import { getTranslation, getTranslationWithParams } from '../../../../util/utility-functions';

@Component({
  selector: 'app-contact-me-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, TranslateModule, MatIconModule],
  templateUrl: './contact-me-form.component.html',
  styleUrl: './contact-me-form.component.css'
})
export class ContactMeFormComponent {
  private formbuilder = inject(FormBuilder);
  private translate = inject(TranslateService)

  @Output()
  postForm = new EventEmitter<ContactMeCreationDTO>();

  @Input({required: true})
  title!: string;

  form = this.formbuilder.group({
    name: ['', {validators: [Validators.required]}],
    email: ['', {validators: [Validators.required, Validators.email]}],
    phoneNumber: new FormControl<string | null>(null),
    message: ['', {validators: [Validators.required, Validators.minLength(MinMessageLength)]}]
  });

  getNameErrors(): string{
    let name = this.form.controls.name;

    if (name.hasError('required')) {
      return getTranslation("contactMe.err.name", this.translate);
    }
    
    return '';
  }
  
  getEmailErrors(): string{
    let email = this.form.controls.email;

    if (email.hasError('required')) {
      return getTranslation("authorization.err.email.required", this.translate);
    }

    if(email.hasError("email")){
      return getTranslation("authorization.err.email.valid", this.translate);
    }

    return '';
  }

  getMessageErrors(): string{
    let message = this.form.controls.message;

    if (message.hasError('required')) {
      return getTranslation("contactMe.err.message", this.translate);
    }

    if(message.hasError('minlength')){
      return getTranslationWithParams("contactMe.err.message.length", MinMessageLength.toString(), this.translate);
    }

    return '';
  }

  sendMessage(){
    if (!this.form.valid) return;

    let contactMe = this.form.value as ContactMeCreationDTO;
    this.postForm.emit(contactMe);
  }
}

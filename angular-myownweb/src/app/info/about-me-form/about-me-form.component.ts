import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { ExperienceCreationDTO, ExperienceDTO } from '../info';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { getTranslation } from '../../tools/utility-functions';

@Component({
  selector: 'app-about-me-form',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, TranslateModule],
  templateUrl: './about-me-form.component.html',
  styleUrl: './about-me-form.component.css'
})
export class AboutMeFormComponent implements OnInit {
  ngOnInit(): void {
    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  @Input()
  model?: ExperienceDTO;

  @Output()
  postForm = new EventEmitter<ExperienceCreationDTO>();

  private formbuilder = inject(FormBuilder);
  private translate = inject(TranslateService);

  form = this.formbuilder.group({
    enTitle: ['', { validators: [Validators.required] }],
    enResume: ['', { validators: [Validators.required] }],
    startDate: new FormControl<Date | null>(null, {
      validators: [Validators.required]
    }),
    endDate: new FormControl<Date | null>(null, {
      validators: [Validators.required]
    }),
    enDescription: ['', { validators: [Validators.required] }],
    enProject: ['', { validators: [Validators.required] }],
    enSkills: ['', { validators: [Validators.required] }]
  })

 
  getErrors(): string {
    let enTitle = this.form.controls.enTitle;
    let enResume = this.form.controls.enResume;
    let startDate = this.form.controls.startDate;
    let endDate = this.form.controls.endDate;
    let enDescription = this.form.controls.enDescription;
    let enProject = this.form.controls.enProject;
    let enSkills = this.form.controls.enSkills;

    if (enTitle.hasError('required')) {
      return getTranslation("noPageFound", this.translate);
    }

    if (enResume.hasError('required')) {
      return getTranslation("noPageFound", this.translate);
    }

    if (startDate.hasError('required')) {
      return getTranslation("noPageFound", this.translate);
    }

    if (endDate.hasError('required')) {
      return getTranslation("noPageFound", this.translate);
    }

    if (enProject.hasError('required')) {
      return getTranslation("noPageFound", this.translate);
    }

    if (enDescription.hasError('required')) {
      return getTranslation("noPageFound", this.translate);
    }

    if (enSkills.hasError('required')) {
      return getTranslation("noPageFound", this.translate);
    }

    return "";
  }
  guardarCambios() {
    if (!this.form.valid) return;

    const genero = this.form.value as ExperienceCreationDTO;
    this.postForm.emit(genero);

  }
}

import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ExperienceCreationDTO, ExperienceDTO } from '../../../../api/dtos/experience-dtos';
import { getTranslation } from '../../../../util/utility-functions';
import { GlobalsEventsStrings, LocalStorageStrings, UrlStrings } from '../../../../util/utility-strings';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxGlobalEventsService } from 'ngx-global-events';

@Component({
  selector: 'app-experience-form',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, TranslateModule,
    MatDatepickerModule, MatTabsModule, MatDividerModule, MatIconModule, MatCheckboxModule],
  templateUrl: './experience-form.component.html',
  styleUrl: './experience-form.component.css'
})
export class ExperienceFormComponent {
  ngOnInit(): void {
    if (this.model !== undefined) {
      this.form.patchValue(this.model);
      this.setSubtitle();
      this.globalEventsService.get(GlobalsEventsStrings.changeLenguage).subscribe(() => {
        this.setSubtitle();
      });
      this.disableEndDate(this.form.controls.currentWork.getRawValue()!);
    }
  }

  @Input()
  model?: ExperienceDTO;

  @Output()
  postForm = new EventEmitter<ExperienceCreationDTO>();

  @Output()
  editSubTitle = new EventEmitter<string | null>();

  private formbuilder = inject(FormBuilder);
  private translate = inject(TranslateService);
  private globalEventsService = inject(NgxGlobalEventsService);
  private oldEndDate!: Date;
  today = new Date();

  urlStrings = UrlStrings;

  form = this.formbuilder.group({
    enTitle: ['', { validators: [Validators.required] }],
    esTitle: new FormControl<string | null>(null),
    enResume: ['', { validators: [Validators.required] }],
    esResume: new FormControl<string | null>(null),
    companyName: new FormControl<string | null>(null, {
      validators: [Validators.required]
    }),
    startDate: new FormControl<Date | null>(null, {
      validators: [Validators.required]
    }),
    endDate: new FormControl<Date | null>(null),
    enProject: ['', { validators: [Validators.required] }],
    esProject: new FormControl<string | null>(null),
    enSkills: ['', { validators: [Validators.required] }],
    esSkills: new FormControl<string | null>(null),
    urlToProject: new FormControl<string | null>(null),
    currentWork: new FormControl<boolean>(false)
  })

  disableEndDate($event: boolean) {
    if ($event) {
      this.form.controls.endDate.disable();

      if (!this.form.get('endDate')?.getRawValue()) {
        this.oldEndDate = this.form.get('endDate')?.getRawValue();
      }
      this.form.controls.endDate.setValue(null);
    }
    else {
      this.form.controls.endDate.enable();
      this.form.controls.endDate.setValue(this.oldEndDate);
    }
  }

  getErrorTitle(): string {
    let enTitle = this.form.controls.enTitle;

    if (enTitle.hasError('required')) {
      return getTranslation("experience.err.entitle", this.translate);
    }

    return "";
  }

  getErrorResume(): string {
    let enResume = this.form.controls.enResume;

    if (enResume.hasError('required')) {
      return getTranslation("experience.err.enResume", this.translate);
    }
    return "";
  }

  getErrorCompany(): string {
    let companyName = this.form.controls.companyName;

    if (companyName.hasError('required')) {
      return getTranslation("experience.err.companyName", this.translate);
    }

    return "";
  }

  getErrorStartDate(): string {
    let startDate = this.form.controls.startDate;

    if (startDate.hasError('required')) {
      return getTranslation("experience.err.startDate", this.translate);
    }

    return "";
  }
  getErrorProject(): string {
    let enProject = this.form.controls.enProject;

    if (enProject.hasError('required')) {
      return getTranslation("experience.err.enProject", this.translate);
    }

    return "";
  }

  getErrorSkills(): string {
    let enSkills = this.form.controls.enSkills;

    if (enSkills.hasError('required')) {
      return getTranslation("experience.err.enSkills", this.translate);
    }

    return "";
  }

  saveChanges() {
    if (!this.form.valid) return;

    let experience = this.form.value as ExperienceCreationDTO;
    this.postForm.emit(experience);
  }

  setSubtitle() {
    let rntValue: any;
    let lang = localStorage.getItem(LocalStorageStrings.language);
    if (lang == 'en' || this.form.controls.esTitle == null || this.form.controls.esTitle.getRawValue() == "") {
      rntValue = this.form.controls.enTitle.getRawValue();
    } else if (lang == 'es') {
      rntValue = this.form.controls.esTitle.getRawValue();
    }
    this.editSubTitle.emit(rntValue);
  }

  setMonthAndYearStart(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = new Date();
    ctrlValue.setMonth(normalizedMonthAndYear.month());
    ctrlValue.setFullYear(normalizedMonthAndYear.year());

    this.form.controls.startDate.setValue(ctrlValue);
    datepicker.close();
  }

  setMonthAndYearEnd(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = new Date();
    ctrlValue.setMonth(normalizedMonthAndYear.month());
    ctrlValue.setFullYear(normalizedMonthAndYear.year());

    this.form.controls.endDate.setValue(ctrlValue);
    datepicker.close();
  }
}

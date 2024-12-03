import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AboutMeCreationDTO, AboutMeDTO } from '../../../../api/dtos/about-me-dtos';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxGlobalEventsService } from 'ngx-global-events';
import { GlobalsEventsStrings, LocalStorageStrings, UrlStrings } from '../../../../util/utility-strings';
import { getTranslation } from '../../../../util/utility-functions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { AboutMeTags } from '../../../../util/utility-variables';

@Component({
  selector: 'app-about-me-form',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, TranslateModule,
    MatDatepickerModule, MatTabsModule, MatIconModule, MatSelectModule],
  templateUrl: './about-me-form.component.html',
  styleUrl: './about-me-form.component.css'
})
export class AboutMeFormComponent implements OnInit {
  ngOnInit(): void {
    if (this.model !== undefined) {
      this.form.patchValue(this.model);
      this.setSubtitle();
      this.globalEventsService.get(GlobalsEventsStrings.changeLenguage).subscribe(() => {
        this.setSubtitle();
      });
    }
  }

  @Input()
  model?: AboutMeDTO;

  @Output()
  postForm = new EventEmitter<AboutMeCreationDTO>();

  @Output()
  editSubTitle = new EventEmitter<string | null>();

  private formbuilder = inject(FormBuilder);
  private translate = inject(TranslateService);
  private globalEventsService = inject(NgxGlobalEventsService);

  aboutMeTags = AboutMeTags;

  urlStrings = UrlStrings;

  form = this.formbuilder.group({
    enTitle: ['', { validators: [Validators.required] }],
    esTitle: new FormControl<string | null>(null),
    enDescription: ['', { validators: [Validators.required] }],
    esDescription: new FormControl<string | null>(null),
    tag: ['', { validators: [Validators.required] }],
    pictures: new FormControl<File[] | string[] | null>(null)
  })

  getErrorTitle(): string {
    let enTitle = this.form.controls.enTitle;

    if (enTitle.hasError('required')) {
      return getTranslation("aboutMe.err.enTitle", this.translate);
    }

    return "";
  }

  getErrorDescription(): string {
    let enDescription = this.form.controls.enDescription;

    if (enDescription.hasError('required')) {
      return getTranslation("aboutMe.err.enDescription", this.translate);
    }

    return "";
  }

  getErrorTag(): string {
    let tag = this.form.controls.tag;

    if (tag.hasError('required')) {
      return getTranslation("aboutMe.err.tag", this.translate);
    }
    
    return "";
  }

  saveChanges() {
    if (!this.form.valid) return;

    let aboutMe = this.form.value as AboutMeCreationDTO;
    this.postForm.emit(aboutMe);
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
}


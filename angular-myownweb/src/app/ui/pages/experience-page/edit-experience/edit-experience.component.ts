import { Component, Input, numberAttribute } from '@angular/core';
import { UrlStrings } from '../../../../util/utility-strings';
import { TranslateModule } from '@ngx-translate/core';
import { SERVICE_CRUD_INJECTION_TOKEN } from '../../../../util/utility-variables';
import { ExperienceService } from '../../../../api/services/experience.service';
import { EditEntityComponent } from "../../../templates/edit-entity/edit-entity.component";
import { ExperienceFormComponent } from '../experience-form/experience-form.component';
import { TabTitleComponent } from "../../../../util/tab-title/tab-title.component";

@Component({
  selector: 'app-edit-experience',
  standalone: true,
  imports: [TranslateModule, EditEntityComponent, TabTitleComponent],
  templateUrl: './edit-experience.component.html',
  styleUrl: './edit-experience.component.css',
  providers: [{ provide: SERVICE_CRUD_INJECTION_TOKEN, useClass: ExperienceService}]
})
export class EditExperienceComponent {
  @Input({ transform: numberAttribute })
  id!: number;

  @Input()
  experienceTitle!: string;

  experienceForm = ExperienceFormComponent;
  urlStrings = UrlStrings;
}

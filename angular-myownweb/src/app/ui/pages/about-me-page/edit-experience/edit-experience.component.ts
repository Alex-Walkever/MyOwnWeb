import { Component, Input, numberAttribute } from '@angular/core';
import { AboutMeFormComponent } from '../about-me-form/about-me-form.component';
import { UrlStrings } from '../../../../util/utility-strings';
import { CreateEntityComponent } from "../../../templates/create-entity/create-entity.component";
import { TranslateModule } from '@ngx-translate/core';
import { SERVICE_CRUD_INJECTION_TOKEN } from '../../../../util/utility-variables';
import { ExperienceService } from '../../../../api/services/experience.service';
import { EditEntityComponent } from "../../../templates/edit-entity/edit-entity.component";

@Component({
  selector: 'app-edit-experience',
  standalone: true,
  imports: [CreateEntityComponent, TranslateModule, EditEntityComponent],
  templateUrl: './edit-experience.component.html',
  styleUrl: './edit-experience.component.css',
  providers: [{ provide: SERVICE_CRUD_INJECTION_TOKEN, useClass: ExperienceService}]
})
export class EditExperienceComponent {
  @Input({ transform: numberAttribute })
  id!: number;

  @Input()
  experienceTitle!: string;

  aboutMeForm = AboutMeFormComponent;
  urlStrings = UrlStrings;
}

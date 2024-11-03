import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AboutMeFormComponent } from '../about-me-form/about-me-form.component';
import { CreateEntityComponent } from '../../../templates/create-entity/create-entity.component';
import { ShowErrorsComponent } from '../../../features/show-errors/show-errors.component';
import { SERVICE_CRUD_INJECTION_TOKEN } from '../../../../util/utility-variables';
import { ExperienceService } from '../../../../api/services/experience.service';
import { UrlStrings } from '../../../../util/utility-strings';

@Component({
  selector: 'app-create-experience',
  standalone: true,
  imports: [CreateEntityComponent, TranslateModule, AboutMeFormComponent, ShowErrorsComponent],
  templateUrl: './create-experience.component.html',
  styleUrl: './create-experience.component.css',
  providers: [{ provide: SERVICE_CRUD_INJECTION_TOKEN, useClass: ExperienceService }]
})
export class CreateExperienceComponent {
  aboutMeForm = AboutMeFormComponent;
  urlStrings = UrlStrings;
}

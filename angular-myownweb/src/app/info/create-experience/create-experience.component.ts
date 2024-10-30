import { Component } from '@angular/core';
import { CreateEntityComponent } from "../../tools/create-entity/create-entity.component";
import { TranslateModule } from '@ngx-translate/core';
import { AboutMeFormComponent } from '../about-me-form/about-me-form.component';
import { UrlStrings } from '../../tools/utility-strings';
import { SERVICE_CRUD_INJECTION_TOKEN } from '../../tools/utility-variables';
import { ExperienceService } from '../experience.service';
import { ShowErrorsComponent } from '../../tools/show-errors/show-errors.component';

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

import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IndexEntityComponent } from '../../../templates/index-entity/index-entity.component';
import { SERVICE_CRUD_INJECTION_TOKEN } from '../../../../util/utility-variables';
import { ExperienceService } from '../../../../api/services/experience.service';
import { UrlStrings } from '../../../../util/utility-strings';
import { transalteString } from '../../../../util/utility-functions';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent {
}

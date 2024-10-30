import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IndexEntityComponent } from "../../tools/index-entity/index-entity.component";
import { UrlStrings } from '../../tools/utility-strings';
import { SERVICE_CRUD_INJECTION_TOKEN } from '../../tools/utility-variables';
import { ExperienceService } from '../experience.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [TranslateModule, IndexEntityComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
  providers: [{ provide: SERVICE_CRUD_INJECTION_TOKEN, useClass: ExperienceService }]
})
export class AboutMeComponent {
  urlString = UrlStrings;
}

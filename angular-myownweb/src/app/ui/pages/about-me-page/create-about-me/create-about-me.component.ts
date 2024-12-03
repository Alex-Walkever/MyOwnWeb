import { Component } from '@angular/core';
import { TabTitleComponent } from "../../../../util/tab-title/tab-title.component";
import { CreateEntityComponent } from "../../../templates/create-entity/create-entity.component";
import { UrlStrings } from '../../../../util/utility-strings';
import { AboutMeFormComponent } from '../about-me-form/about-me-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { AboutMeService } from '../../../../api/services/about-me.service';
import { SERVICE_CRUD_INJECTION_TOKEN } from '../../../../util/utility-variables';

@Component({
  selector: 'app-create-about-me',
  standalone: true,
  imports: [TabTitleComponent, CreateEntityComponent, TranslateModule],
  templateUrl: './create-about-me.component.html',
  styleUrl: './create-about-me.component.css',
  providers: [{ provide: SERVICE_CRUD_INJECTION_TOKEN, useClass: AboutMeService }]
})
export class CreateAboutMeComponent {
  urlStrings = UrlStrings;
  aboutMeForm = AboutMeFormComponent;
}

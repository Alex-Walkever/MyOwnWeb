import { Component } from '@angular/core';
import { IndexEntityComponent } from "../../../templates/index-entity/index-entity.component";
import { UrlStrings } from '../../../../util/utility-strings';
import { transalteString } from '../../../../util/utility-functions';
import { TranslateModule } from '@ngx-translate/core';
import { SERVICE_CRUD_INJECTION_TOKEN } from '../../../../util/utility-variables';
import { ExperienceService } from '../../../../api/services/experience.service';
import { TabTitleComponent } from "../../../../util/tab-title/tab-title.component";

@Component({
  selector: 'app-experience-control-panel',
  standalone: true,
  imports: [TranslateModule, IndexEntityComponent, TabTitleComponent],
  templateUrl: './experience-control-panel.component.html',
  styleUrl: './experience-control-panel.component.css',
  providers: [{ provide: SERVICE_CRUD_INJECTION_TOKEN, useClass: ExperienceService }]
})
export class ExperienceControlPanelComponent {
  urlString = UrlStrings;
  columnsToShow = ['id', 'enTitle', 'companyName', 'startDate', 'actions'];
  transalteString: Function = (value: string, column: string) => {
    return transalteString(value, column);
  }
}

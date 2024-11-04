import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IndexEntityComponent } from '../../../templates/index-entity/index-entity.component';
import { SERVICE_CRUD_INJECTION_TOKEN } from '../../../../util/utility-variables';
import { ExperienceService } from '../../../../api/services/experience.service';
import { UrlStrings } from '../../../../util/utility-strings';
import { getYearMonthString, transalteString } from '../../../../util/utility-functions';

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
  columnsToShow = ['id', 'enTitle', 'companyName', 'startDate', 'actions'];
  transalteString: Function = (value: string, column: string) => {
    return transalteString(value, column);
  }
}

import { Component } from '@angular/core';
import { TabTitleComponent } from "../../../../util/tab-title/tab-title.component";
import { TranslateModule } from '@ngx-translate/core';
import { IndexEntityComponent } from "../../../templates/index-entity/index-entity.component";
import { UrlStrings } from '../../../../util/utility-strings';
import { transalteString } from '../../../../util/utility-functions';
import { SERVICE_CRUD_INJECTION_TOKEN } from '../../../../util/utility-variables';
import { AboutMeService } from '../../../../api/services/about-me.service';

@Component({
  selector: 'app-about-control-panel',
  standalone: true,
  imports: [TabTitleComponent, TranslateModule, IndexEntityComponent],
  templateUrl: './about-control-panel.component.html',
  styleUrl: './about-control-panel.component.css',
  providers: [{ provide: SERVICE_CRUD_INJECTION_TOKEN, useClass: AboutMeService }]
})
export class AboutControlPanelComponent {
  urlString = UrlStrings;
  columnsToShow = ['id', 'enTitle', 'actions'];
  transalteString: Function = (value: string, column: string) => {
    return transalteString(value, column);
  }
}

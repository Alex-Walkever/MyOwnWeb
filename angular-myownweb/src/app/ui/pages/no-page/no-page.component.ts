import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TabTitleComponent } from "../../../util/tab-title/tab-title.component";

@Component({
  selector: 'app-no-page',
  standalone: true,
  imports: [TranslateModule, TabTitleComponent],
  templateUrl: './no-page.component.html',
  styleUrl: './no-page.component.css'
})
export class NoPageComponent {

}

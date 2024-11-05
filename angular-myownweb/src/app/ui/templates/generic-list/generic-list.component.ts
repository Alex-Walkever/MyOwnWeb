import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingComponent } from "../../../util/loading/loading.component";

@Component({
  selector: 'app-generic-list',
  standalone: true,
  imports: [TranslateModule, LoadingComponent],
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.css'
})
export class GenericListComponent {
  @Input({required: true})
  list: any;
}

import { Component, inject } from '@angular/core';
import { TabTitleComponent } from "../../../util/tab-title/tab-title.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [TabTitleComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
}

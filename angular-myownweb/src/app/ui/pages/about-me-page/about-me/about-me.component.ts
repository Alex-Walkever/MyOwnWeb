import { Component, Input } from '@angular/core';
import { TabTitleComponent } from "../../../../util/tab-title/tab-title.component";

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [TabTitleComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
})
export class AboutMeComponent{
@Input()
igShortCode: string = "Cvhxp3dOmxJ"
}

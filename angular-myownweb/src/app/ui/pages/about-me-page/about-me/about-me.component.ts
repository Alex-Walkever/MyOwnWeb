import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
})
export class AboutMeComponent{
@Input()
igShortCode: string = "Cvhxp3dOmxJ"
}

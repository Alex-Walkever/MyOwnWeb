import { Component, inject, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { getTranslation } from '../utility-functions';
import { TranslateService } from '@ngx-translate/core';
import { NgxGlobalEventsService } from 'ngx-global-events';
import { GlobalsEventsStrings } from '../utility-strings';

@Component({
  selector: 'app-tab-title',
  standalone: true,
  imports: [],
  templateUrl: './tab-title.component.html',
  styleUrl: './tab-title.component.css'
})
export class TabTitleComponent implements OnInit {

  translateService: TranslateService;
  private globalEventsService: NgxGlobalEventsService;

  @Input({ required: true })
  title: string = 'Dev template';

  oldTitle!: string;

  constructor(private titleService: Title) {
    this.translateService = inject(TranslateService);
    this.globalEventsService =inject(NgxGlobalEventsService);
  }

  ngOnInit(): void {
    this.transalteThis();
    this.globalEventsService.get(GlobalsEventsStrings.changeLenguage).subscribe(() => {
      this.titleService.setTitle(getTranslation(this.title, this.translateService));
    });
  }

  transalteThis(): void{
    this.translateService.get(this.title).subscribe((res: string) => {
      this.oldTitle = this.titleService.getTitle();
      this.titleService.setTitle(res);
    });
  }

  ngOnDestroy(): void {
    if(this.oldTitle !== undefined)
    {
      this.titleService.setTitle(this.oldTitle);
    }
  }
}


import { AfterViewInit, Component, inject } from '@angular/core';
import { ExperienceService } from '../../../../api/services/experience.service';
import { HeadersResponses, LocalStorageStrings } from '../../../../util/utility-strings';
import { getHeaderString, getYearMonthString } from '../../../../util/utility-functions';
import { ExperienceDTO } from '../../../../api/dtos/experience-dtos';
import { HttpResponse } from '@angular/common/http';
import { LoadingComponent } from "../../../../util/loading/loading.component";
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TabTitleComponent } from "../../../../util/tab-title/tab-title.component";

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [LoadingComponent, MatCardModule, TranslateModule, MatButtonModule, MatIconModule, MatDividerModule, TabTitleComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent implements AfterViewInit {

  experienceService = inject(ExperienceService);
  totalAmoutOfRecords: number = 0;
  allExperiences!: ExperienceDTO[];
  loading: boolean = true;
  progressHeight: number = 0;

  yearMonth = getYearMonthString;

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.loadRecords();
  }

  finishAllCards()
  {
    const element = document.getElementById("allCards");
      let progressElement = document.getElementById("progressbar");

      this.progressHeight = element?.clientHeight!;
      progressElement?.setAttribute("style", `width: ${element?.clientHeight!+10}px`);
  }

  loadRecords() {
    this.experienceService.getAllExperiences().subscribe((experiences: HttpResponse<ExperienceDTO[]>) => {
      this.allExperiences = experiences.body as ExperienceDTO[];
      this.totalAmoutOfRecords = getHeaderString<ExperienceDTO[]>(experiences, HeadersResponses.totalAmountOfRecords);
      this.loading = false;
    });
  }

  getTitle(experience: ExperienceDTO): string {
    return this.generalLenguageCondition(experience.enTitle, experience.esTitle);
  }

  getResume(experience: ExperienceDTO): string {
    return this.generalLenguageCondition(experience.enResume, experience.esResume);
  }

  getProject(experience: ExperienceDTO): string {
    return this.generalLenguageCondition(experience.enProject, experience.esProject);
  }

  getSkills(experience: ExperienceDTO): string {
    return this.generalLenguageCondition(experience.enSkills, experience.esSkills);
  }

  private generalLenguageCondition(enField: string, esField: string): string {
    let rntValue: string = '';
    let lang = localStorage.getItem(LocalStorageStrings.language);

    if (lang == 'en' || esField == null || esField == "") {
      rntValue = enField;
    } else if (lang == 'es') {
      rntValue = esField;
    }

    return rntValue;
  }

  goToUrl(url: string) {
    window.open(url, "_blank");
  }

  evenNumer(value: number){
    let cardElement = document.getElementById(`card${+value}`);
    let dividerElement1 = document.getElementById(`divider1${+value}`);
    let dividerElement2 = document.getElementById(`divider2${+value}`);


    if(value % 2 === 0)
    {
      cardElement?.setAttribute("style", `left: 51%`);
      dividerElement1?.setAttribute("style", `left: 50.6%; top: 50%; width: 55.3%;`);
      dividerElement2?.setAttribute("style", `left: 50.6%; top: 50%; width: 55.3%;`);
    }
    else{
      cardElement?.setAttribute("style", `left: 15%`);
      dividerElement1?.setAttribute("style", `left: -15%; width: 65.3%;`);
      dividerElement2?.setAttribute("style", `left: -15%; width: 65.3%;`);
    }
  }
}

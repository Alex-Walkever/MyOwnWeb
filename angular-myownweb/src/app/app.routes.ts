import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { NoPageComponent } from './tools/no-page/no-page.component';
import { AboutMeComponent } from './info/about-me/about-me.component';
import { UrlStrings } from './tools/utility-strings';
import { ShowTranslateStringsComponent } from './tools/show-translate-strings/show-translate-strings.component';
import { CreateExperienceComponent } from './info/create-experience/create-experience.component';

export const routes: Routes = [
    { path: UrlStrings.urlHome, component: MainPageComponent },

    { path: UrlStrings.urlAboutMe, component: AboutMeComponent },
    { path: UrlStrings.urlCreateExperience, component: CreateExperienceComponent},

    {path: UrlStrings.urlShowTranslateStrings, component: ShowTranslateStringsComponent},

    { path: UrlStrings.urlNoPageFound, component: NoPageComponent },
    { path: '**', redirectTo: `/${UrlStrings.urlNoPageFound}` }
];

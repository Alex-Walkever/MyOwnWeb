import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { NoPageComponent } from './tools/no-page/no-page.component';
import { AboutMeComponent } from './info/about-me/about-me.component';
import { UrlStrings } from './tools/url-strings';

export const routes: Routes = [
    { path: UrlStrings.urlHome, component: MainPageComponent },

    { path: UrlStrings.urlAboutMe, component: AboutMeComponent },

    { path: UrlStrings.urlNoPageFound, component: NoPageComponent },
    { path: '**', redirectTo: `/${UrlStrings.urlNoPageFound}` }
];

import { Routes } from '@angular/router';
import { NoPageComponent } from './ui/pages/no-page/no-page.component';
import { UrlStrings } from './util/utility-strings';
import { ShowTranslateStringsComponent } from './ui/pages/show-translate-strings-page/show-translate-strings.component';
import { MainPageComponent } from './ui/pages/main-page/main-page.component';
import { AboutMeComponent } from './ui/pages/about-me-page/about-me/about-me.component';
import { CreateExperienceComponent } from './ui/pages/experience-page/create-experience/create-experience.component';
import { EditExperienceComponent } from './ui/pages/experience-page/edit-experience/edit-experience.component';
import { ExperienceComponent } from './ui/pages/experience-page/experience/experience.component';
import { LoginComponent } from './ui/pages/authorization-page/login/login.component';
import { RegisterComponent } from './ui/pages/authorization-page/register/register.component';

export const routes: Routes = [
    { path: UrlStrings.urlHome, component: MainPageComponent },

    { path: UrlStrings.urlAboutMe, component: AboutMeComponent },

    { path: UrlStrings.urlExperience, component: ExperienceComponent },
    { path: UrlStrings.urlCreateExperience, component: CreateExperienceComponent },
    { path: UrlStrings.urlEditExperience + '/:id', component: EditExperienceComponent },

    { path: UrlStrings.urlLogin, component: LoginComponent },
    { path: UrlStrings.urlRegister, component: RegisterComponent },

    { path: UrlStrings.urlShowTranslateStrings, component: ShowTranslateStringsComponent },

    { path: UrlStrings.urlNoPageFound, component: NoPageComponent },
    { path: '**', redirectTo: `/${UrlStrings.urlNoPageFound}` }
];

import { InjectionToken } from "@angular/core";

export const SERVICE_CRUD_INJECTION_TOKEN = new InjectionToken("SERVICE_CRUD_TOKEN");

export const PageSizeOptions = [5, 10, 50];

export const MinMessageLength = 25;

export const AboutMeTags = [{value: 'mainDescription', viewValue: 'aboutMe.tag.mainDescription'},
    {value: 'hobby', viewValue: 'aboutMe.tag.hobby'},
    {value: 'project', viewValue: 'aboutMe.tag.project'},
    {value: 'certificate', viewValue: 'aboutMe.tag.certificate'}
];
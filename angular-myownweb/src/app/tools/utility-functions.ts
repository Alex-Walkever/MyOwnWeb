import { inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LocalStorageStrings } from "./utility-strings";
import { HttpParams } from "@angular/common/http";

export function extractErrors(obj: any): string[] {
    const err = obj.error.errors;

    let errorMessage: string[] = [];

    for (let key in err) {
        let field = key;
        const messagesWithField = err[key].map((message: string) => `${field}: ${message}`);
        errorMessage = errorMessage.concat(messagesWithField);
    }

    return errorMessage;
}

export function extractErrorsEntity(obj: any): string[] {
    let errorMessage: string[] = [];

    for (let i = 0; i < obj.error.length; i++) {
        const element = obj.error[i];
        errorMessage.push(element.description);
    }

    return errorMessage;
}

export function getTranslation(str: string, translate: TranslateService): string {
    let returnString = '';
    translate.get(str).subscribe((res: string) => {
        returnString = res;
    });
    return returnString;
}

export interface AnimationShowAndHide {
    htmlElement: HTMLElement;
    transalteYStrat: string;
    transalteYEnd: string;
    duration: number;
    interations: number;
}

export function globalAnimationShowAndHide(animation: AnimationShowAndHide[]) {
    for (let i = 0; i < animation.length; i++) {
        const element = animation[i];

        let Style = [
            { transform: "translateY(" + element.transalteYStrat + ")" },
            { transform: "translateY(" + element.transalteYEnd + ")" }
        ];
        let timing = {
            duration: element.duration,
            iterations: element.interations
        };

        const animated = element.htmlElement.animate(Style, timing);
        animated.onfinish = () => {
            element.htmlElement.style.transform = "translateY(" + element.transalteYEnd + ")";
        };
    }
}

export function buildQueryParams(obj: any): HttpParams{
    let queryParams = new HttpParams();

    for(let property in obj){
        if(obj.hasOwnProperty(property)){
            queryParams = queryParams.append(property, obj[property]);
        }
    }
    return queryParams;
}
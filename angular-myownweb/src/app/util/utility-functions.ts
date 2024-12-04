import { TranslateService } from "@ngx-translate/core";
import { HttpParams, HttpResponse } from "@angular/common/http";

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

export function getTranslationWithParams(str: string, value: string, translate: TranslateService): string {
    let returnString = '';
    translate.get(str, { value: value }).subscribe((res: string) => {
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

export function buildQueryParams(obj: any): HttpParams {
    let queryParams = new HttpParams();

    for (let property in obj) {
        if (obj.hasOwnProperty(property)) {
            queryParams = queryParams.append(property, obj[property]);
        }
    }
    return queryParams;
}

export function getYearMonthString(value: string): string {
    return sliceDateDay(splitDateTime(value));
}

export function splitDateTime(value: string): string {
    return value.split('T')[0];
}

export function sliceDateDay(value: string): string {
    return value.slice(0, -3);
}

export function transalteString(value: string, column: string) {
    let rntValue = value;

    if (column == 'enDate' || column == 'startDate') {
        rntValue = getYearMonthString(rntValue);
    }

    return rntValue;
}

export function validateEmail(value: string): boolean {
    var re = /\S+@\S+\.\S+/;
    if (re.test(value)) {
        return true;
    }

    return false;
}

export function addTagToErrors(errors: string[], errorTag: string): string[] {
    let rntErrors: string[] = [];

    for (let i = 0; i < errors.length; i++) {
        const element = errors[i];

        let tranerror = errorTag + element;
        rntErrors[i] = tranerror;
    }

    return rntErrors;
}

export function getHeaderString<TDTO>(response: HttpResponse<TDTO>, tag: string): number {
    const header = response.headers.get(tag) as string;
    return parseInt(header, 10);
}

export function goToUrlInOtherWindow(url: string) {
    window.open(url, "_blank");
}

export function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const lector = new FileReader();
        lector.readAsDataURL(file);
        lector.onload = () => resolve(lector.result as string);
        lector.onerror = (error) => reject(error);
    });
}
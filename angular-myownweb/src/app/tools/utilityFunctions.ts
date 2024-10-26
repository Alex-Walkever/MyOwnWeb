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

    for(let i = 0; i < obj.error.length; i++){
        const element = obj.error[i];
        errorMessage.push(element.description);
    }

    return errorMessage;
}
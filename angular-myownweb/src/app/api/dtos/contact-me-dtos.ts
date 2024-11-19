export interface ContactMeCreationDTO {
    name: string;
    email: string;
    phoneNumber: string;
    message: string;
}

export interface ContactMeDTO {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    message: string;
    readed: boolean;
    obtained: Date;
}
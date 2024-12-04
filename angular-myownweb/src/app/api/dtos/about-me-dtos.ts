export interface AboutMeCreationDTO{
    enTitle: string;
    esTitle: string;
    enDescription: string;
    esDescription: string;
    tag: string;
    pictures?: FileList;
}

export interface AboutMeDTO{
    id: number;
    enTitle: string;
    esTitle: string;
    enDescription: string;
    esDescription: string;
    tag: string;
    pictures?: string[];
}
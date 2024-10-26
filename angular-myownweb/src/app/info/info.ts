export interface ExperienceCreationDTO{
    enTitle: string;
    esTitle: string;
    enResume: string;
    esResume: string;
    startDate: Date;
    endDate: Date;
    enProject: string;
    esProject: string;
    enSkills: string;
    esSkills: string;
    urlToProject: string;
    currentWork: boolean;
}

export interface ExperienceDTO{
    id:number;
    enTitle: string;
    esTitle: string;
    enResume: string;
    esResume: string;
    startDate: Date;
    endDate: Date;
    enProject: string;
    esProject: string;
    enSkills: string;
    esSkills: string;
    urlToProject: string;
    currentWork: boolean;
}
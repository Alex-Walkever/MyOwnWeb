import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { PaginationDTO } from "../models/paginationDTO"

export interface IServiceCRUD<TDTO, TCreationDTO> {
    getPagination(pagination: PaginationDTO): Observable<HttpResponse<TDTO[]>>;
    getFromId(id: number): Observable<TDTO>;
    update(id: number, entidad: TCreationDTO): Observable<any>;
    create(entity: TCreationDTO): Observable<any>;
    delete(id: number): Observable<any>;
}
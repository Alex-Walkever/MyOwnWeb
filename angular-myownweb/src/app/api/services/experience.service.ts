import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IServiceCRUD } from '../../lib/interfaces/IServiceCRUD';
import { ExperienceCreationDTO, ExperienceDTO } from '../dtos/experience-dtos';
import { environment } from '../../../environments/environment';
import { UrlStrings } from '../../util/utility-strings';
import { PaginationDTO } from '../dtos/paginationDTO';
import { buildQueryParams } from '../../util/utility-functions';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService implements IServiceCRUD<ExperienceDTO, ExperienceCreationDTO>{

  constructor() {}
  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/' + UrlStrings.urlAboutMe;

  public getPagination(pagination: PaginationDTO): Observable<HttpResponse<ExperienceDTO[]>>{
    let queryParams = buildQueryParams(pagination);
    return this.http.get<ExperienceDTO[]>(this.urlBase, {params: queryParams, observe: 'response'});
  }
  
  public getFromId(id: number): Observable<ExperienceDTO>{
    return this.http.get<ExperienceDTO>(`${this.urlBase}/${id}`);
  }

  public update(id: number, actor: ExperienceCreationDTO){
    const formData = new FormData;
    return this.http.put(`${this.urlBase}/${id}`, formData);
  }

  public create(actor: ExperienceCreationDTO){
    const formData = new FormData;
    return this.http.post(this.urlBase, formData);
  }

  public remove(id: number){
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}

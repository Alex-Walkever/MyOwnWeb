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
  private urlBase = environment.apiURL + '/' + UrlStrings.urlExperience;

  public getPagination(pagination: PaginationDTO): Observable<HttpResponse<ExperienceDTO[]>>{
    let queryParams = buildQueryParams(pagination);
    return this.http.get<ExperienceDTO[]>(this.urlBase, {params: queryParams, observe: 'response'});
  }
  
  public getFromId(id: number): Observable<ExperienceDTO>{
    console.log(`${this.urlBase}/${id}`);
    return this.http.get<ExperienceDTO>(`${this.urlBase}/${id}`);
  }

  public update(id: number, experienceCreationDTO: ExperienceCreationDTO){
    return this.http.put(`${this.urlBase}/${id}`, experienceCreationDTO);
  }

  public create(experienceCreationDTO: ExperienceCreationDTO){
    return this.http.post(this.urlBase, experienceCreationDTO);
  }

  public remove(id: number){
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}

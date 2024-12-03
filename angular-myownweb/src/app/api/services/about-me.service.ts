import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UrlStrings } from '../../util/utility-strings';
import { PaginationDTO } from '../dtos/paginationDTO';
import { Observable } from 'rxjs';
import { buildQueryParams } from '../../util/utility-functions';
import { AboutMeCreationDTO, AboutMeDTO } from '../dtos/about-me-dtos';

@Injectable({
  providedIn: 'root'
})
export class AboutMeService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/' + UrlStrings.urlAboutMe;

  public getPagination(pagination: PaginationDTO): Observable<HttpResponse<AboutMeDTO[]>>{
    let queryParams = buildQueryParams(pagination);
    return this.http.get<AboutMeDTO[]>(this.urlBase, {params: queryParams, observe: 'response'});
  }

  public getAllAboutMe() : Observable<HttpResponse<AboutMeDTO[]>>{
    return this.http.get<AboutMeDTO[]>(`${this.urlBase}/allaboutMe`, {observe: 'response'});
  }
  
  public getFromId(id: number): Observable<AboutMeDTO>{
    return this.http.get<AboutMeDTO>(`${this.urlBase}/${id}`);
  }

  public update(id: number, aboutMeCreationDTO: AboutMeCreationDTO){
    return this.http.put(`${this.urlBase}/${id}`, aboutMeCreationDTO);
  }

  public create(aboutMeCreationDTO: AboutMeCreationDTO){
    return this.http.post(this.urlBase, aboutMeCreationDTO);
  }

  public remove(id: number){
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}

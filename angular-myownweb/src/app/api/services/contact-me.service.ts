import { inject, Injectable } from '@angular/core';
import { ContactMeCreationDTO, ContactMeDTO } from '../dtos/contact-me-dtos';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { PaginationDTO } from '../dtos/paginationDTO';
import { Observable } from 'rxjs';
import { buildQueryParams } from '../../util/utility-functions';

@Injectable({
  providedIn: 'root'
})
export class ContactMeService {
  private http = inject(HttpClient);

  private urlBase = environment.apiURL + '/contactMe';

  constructor() { }

  public getPagination(pagination: PaginationDTO): Observable<HttpResponse<ContactMeDTO[]>>{
    let queryParams = buildQueryParams(pagination);
    return this.http.get<ContactMeDTO[]>(this.urlBase, {params: queryParams, observe: 'response'});
  }

  public getFromId(id: number): Observable<ContactMeDTO>{
    return this.http.get<ContactMeDTO>(`${this.urlBase}/${id}`);
  }

  public create(contactMeDto: ContactMeCreationDTO){
    return this.http.post(this.urlBase, contactMeDto);
  }

  public update(id: number, readed: boolean){
    return this.http.put(`${this.urlBase}/${id}`, readed);
  }

  public remove(id: number){
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}

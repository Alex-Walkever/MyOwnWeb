import { inject, Injectable } from '@angular/core';
import { PaginationDTO } from '../dtos/paginationDTO';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthorizationResponseDTO, UserCredentialsDTO, UserDTO } from '../dtos/authorization-dtos';
import { Observable, tap } from 'rxjs';
import { buildQueryParams } from '../../util/utility-functions';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/usuarios';
  private readonly keyToken = 'token';
  private readonly expirationKey = 'token-expiracion';

  getPagination(pagination: PaginationDTO): Observable<HttpResponse<UserDTO[]>> {
    let queryParams = buildQueryParams(pagination);
    return this.http.get<UserDTO[]>(`${this.urlBase}/ListadoUsuarios`, { params: queryParams, observe: 'response' });
  }

  makeAdmin(email: string) {
    return this.http.post(`${this.urlBase}/HacerAdmin`, { email });
  }

  revokeAdmin(email: string) {
    return this.http.post(`${this.urlBase}/RemoverAdmin`, { email });
  }

  getToken(): string | null {
    return localStorage.getItem(this.keyToken);
  }

  register(credentials: UserCredentialsDTO): Observable<AuthorizationResponseDTO> {
    return this.http.post<AuthorizationResponseDTO>(`${this.urlBase}/registrar`, credentials)
      .pipe(tap(authorizationResponse => this.saveToken(authorizationResponse)));
  }

  login(credenciales: UserCredentialsDTO): Observable<AuthorizationResponseDTO> {
    return this.http.post<AuthorizationResponseDTO>(`${this.urlBase}/login`, credenciales)
      .pipe(tap(authorizationResponse => this.saveToken(authorizationResponse)));
  }

  getJWTField(campo: string): string {
    const token = localStorage.getItem(this.keyToken);
    if (!token) { return ''; }
    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo];
  }

  saveToken(authorizationResponse: AuthorizationResponseDTO) {
    localStorage.setItem(this.keyToken, authorizationResponse.token);
    localStorage.setItem(this.expirationKey, authorizationResponse.expiration.toString());
  }

  isLogin(): boolean {
    const token = localStorage.getItem(this.keyToken);

    if (!token) {
      return false;
    }

    const expiracion = localStorage.getItem(this.expirationKey)!;
    const expiracionFecha = new Date(expiracion);

    if (expiracionFecha <= new Date()) {
      this.logout();
      return false;
    }

    return true;
  }

  logout() {
    localStorage.removeItem(this.keyToken);
    localStorage.removeItem(this.expirationKey);
  }

  getRol(): string {
    const admin = this.getJWTField('isadmin');
    if(admin){
      return 'admin';
    } else{
      return '';
    }
  }
}

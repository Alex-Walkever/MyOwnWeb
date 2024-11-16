import { inject, Injectable } from '@angular/core';
import { PaginationDTO } from '../dtos/paginationDTO';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { AuthorizationResponseDTO, ClaimDTO, UserCredentialsDTO, UserCredentialsEmailDTO, UserCredentialsUsernameDTO, UserDTO } from '../dtos/authorization-dtos';
import { Observable, tap } from 'rxjs';
import { buildQueryParams } from '../../util/utility-functions';
import { environment } from '../../../environments/environment';
import { UrlStrings, UserRolStrings } from '../../util/utility-strings';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() { }

  private http = inject(HttpClient);
  private router = inject(Router);
  private urlBase = environment.apiURL + '/security';
  private readonly keyToken = 'token';
  private readonly expirationKey = 'expiration-token';

  getPagination(pagination: PaginationDTO): Observable<HttpResponse<UserDTO[]>> {
    let queryParams = buildQueryParams(pagination);
    return this.http.get<UserDTO[]>(`${this.urlBase}/userList`, { params: queryParams, observe: 'response' });
  }

  addClaim(claim: ClaimDTO) {
    return this.http.post(`${this.urlBase}/addClaim`, claim);
  }

  removeClaim(claim: ClaimDTO) {
    return this.http.post(`${this.urlBase}/removeClaim`, claim);
  }

  public getClaimsFromUser(username: string): Observable<HttpResponse<ClaimDTO>> {
    let params = new HttpParams();
    params = params.set('username', username);
    return this.http.get<ClaimDTO>(`${this.urlBase}/` + username, { observe: 'response' });
  }

  getToken(): string | null {
    return localStorage.getItem(this.keyToken);
  }

  register(credentials: UserCredentialsDTO): Observable<AuthorizationResponseDTO> {
    return this.http.post<AuthorizationResponseDTO>(`${this.urlBase}/register`, credentials)
      .pipe(tap(authorizationResponse => this.saveToken(authorizationResponse)));
  }

  loginUsername(credentials: UserCredentialsUsernameDTO): Observable<AuthorizationResponseDTO> {
    return this.http.post<AuthorizationResponseDTO>(`${this.urlBase}/loginUsername`, credentials)
      .pipe(tap(authorizationResponse => this.saveToken(authorizationResponse)));
  }

  loginEmail(credentials: UserCredentialsEmailDTO): Observable<AuthorizationResponseDTO> {
    return this.http.post<AuthorizationResponseDTO>(`${this.urlBase}/loginEmail`, credentials)
      .pipe(tap(authorizationResponse => this.saveToken(authorizationResponse)));
  }

  public remove(username: string) {
    let params = new HttpParams();
    params = params.set('username', username);
    return this.http.delete(`${this.urlBase}/` + username);
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
    this.router.navigate([UrlStrings.urlLogin]);
  }

  getAdminRol(): string {
    const admin = this.getJWTField(UserRolStrings.isAdmin);
    if (admin) {
      return UserRolStrings.isAdmin;
    } else {
      return '';
    }
  }

  getOwnerRol(): string {
    const owner = this.getJWTField(UserRolStrings.isOwner);
    if (owner) {
      return UserRolStrings.isOwner;
    } else {
      return '';
    }
  }

  getUserRol(): string {
    const user = this.getJWTField(UserRolStrings.isUser);
    if (user) {
      return UserRolStrings.isUser;
    } else {
      return '';
    }
  }
}

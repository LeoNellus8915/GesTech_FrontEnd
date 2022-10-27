import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, header } from 'src/environments/environment';
import { LocalSession } from '../session/local-session';

@Injectable({providedIn: 'root'})
export class AuthService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  public login(loginForm: JSON): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/login`, loginForm,{headers: header.header()});
  }

  public getDatiByEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/get-dati-by-email/${email}`,{headers: header.header()});
  }

  public sceltaRuolo(idRisorsa: number, ruolo: string): Observable<LocalSession> {
    return this.http.get<LocalSession>(`${this.apiServerUrl}/select-ruolo/${idRisorsa}/${ruolo}`,{headers: header.header()});
  }

  public cambiaPassword(updateForm: JSON): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/modifica-password`, updateForm,{headers: header.header()});
  }

  public addUtente(addForm: JSON): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/salva-utente`, addForm,{headers: header.header()});
  }
}
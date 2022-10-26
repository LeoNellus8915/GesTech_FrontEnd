import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalSession } from '../session/local-session';

@Injectable({providedIn: 'root'})
export class AuthService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public login(loginForm: JSON): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/login`, loginForm);
  }

  public token(idDipendente: number): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/token`, idDipendente);
  }

  public getDatiByEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/get-dati-by-email/${email}`);
  }

  public sceltaRuolo(idRisorsa: number, ruolo: string): Observable<LocalSession> {
    return this.http.get<LocalSession>(`${this.apiServerUrl}/select-ruolo/${idRisorsa}/${ruolo}`);
  }

  public cambiaPassword(updateForm: JSON): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/modifica-password`, updateForm);
  }

  public addUtente(addForm: JSON): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/salva-utente`, addForm);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, header } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class RisorseService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  public allCandidati(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/all-candidati`, {headers: header.header()});
  }

  public allDipendenti(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/all-dipendenti`, {headers: header.header()});
  }

  public getDipendenti(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/get-dipendenti`, {headers: header.header()});
  }

  public getCandidatoVisualizza(idCandidato: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/get-candidato-visualizza/${idCandidato}`, {headers: header.header()});
  }

  public getCandidatoModifica(idCandidato: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/get-candidato-modifica/${idCandidato}`, {headers: header.header()});
  }

  public eliminaCandidato(idCandidato: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/elimina-candidato/${idCandidato}`, {headers: header.header()});
  }

  public salvaCandidato(addForm: JSON): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/salva-candidato`, addForm, {headers: header.header()});
  }

  public emailEsistente(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/controllo-email-modifica`, email, {headers: header.header()});
  }

  public updateCandidato(updateForm: JSON, idCandidato: number, idRisorsa: number): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/modifica-candidato/${idCandidato}/${idRisorsa}`, updateForm, {headers: header.header()});
  }

  public getCodiciCandidati(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-codici-candidati`, {headers: header.header()});
  }

  public getRecruiters(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-recruiters`, {headers: header.header()});
  }

  public getCandidatiByRecruiter(idRecruiter: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-candidati-by-recruiter/${idRecruiter}`, {headers: header.header()});
  }

  public getCandidatiByRecruiterDate(idRecruiter: number, changeForm: JSON): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/get-candidati-by-recruiter-date/${idRecruiter}`, changeForm, {headers: header.header()});
  }

  public getCandidatiTotali(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-candidati-totali`, {headers: header.header()});
  }

  public getCandidatiGiornalieri(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-candidati-giornalieri`, {headers: header.header()});
  }

  public getPercentualiRuoli(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-percentuali-ruoli`, {headers: header.header()});
  }

  public countCandidatiGiornalieriByRecruiter(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-candidati-giornalieri-by-recriter`, {headers: header.header()});
  }

  public countCandidatiTotaliByRecruiter(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-candidati-totali-by-recriter`, {headers: header.header()});
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, header } from 'src/environments/environment';
import { Persone } from '../model/persone';

@Injectable({providedIn: 'root'})
export class RichiesteService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getRichiesteAperteAdmin(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/all-richieste-aperte-admin`,{ headers: header.header()});
  }
  
  public getRichiesteAperteAccount(idDipendente: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/all-richieste-aperte-account/${idDipendente}`, {headers: header.header()});
  }

  public getRichiesteAperteCommerciale(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/all-richieste-aperte-commerciale`, {headers: header.header()});
  }

  public getRichiesteAperteRecruiter(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/all-richieste-aperte-recruiter`, {headers: header.header()});
  }

  public getRichiesteAperte(nome: string, cognome: string, idDipendente: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/all-richieste-aperte/${nome}/${cognome}/${idDipendente}`, {headers: header.header()});
  }

  public getRichiesteChiuse(ruolo: string, nomeCognome: string, idDipendente: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/all-richieste-chiuse/${ruolo}/${nomeCognome}/${idDipendente}`, {headers: header.header()});
  }

  public getRichiesta(idRichiesta: number, pagina: number, ruolo: string): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-richiesta/${idRichiesta}/${pagina}/${ruolo}`, {headers: header.header()});
  }

  public eliminaRichiesta(idRichiesta: number, pagina: number, ruolo: string): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/elimina-richiesta/${idRichiesta}/${pagina}/${ruolo}`, {headers: header.header()});
  }

  public updateRichiesta(updateForm: JSON, idRichiesta: number, idDipendente: number, pagina: number, ruolo: string): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/modifica-richiesta/${idRichiesta}/${idDipendente}/${pagina}/${ruolo}`, updateForm, {headers: header.header()});
  }

  public getRecruiters(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiServerUrl}/get-nomi-recruiter`, {headers: header.header()});
  }

  public addRichiesta(addForm: JSON, ruolo: string): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/salva-richiesta/${ruolo}`, addForm, {headers: header.header()});
  }

  public getCodiciRichiesteAperteAdmin(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-codici-richieste-aperte-admin`, {headers: header.header()});
  }

  public getCodiciRichiesteAperteAccount(idDipendente: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-codici-richieste-aperte-account/${idDipendente}`, {headers: header.header()});
  }

  public getCodiciRichiesteAperteCommerciale(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-codici-richieste-aperte-commerciale`, {headers: header.header()});
  }

  public getCodiciRichiesteAperteRecruiter(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-codici-richieste-aperte-recruiter`, {headers: header.header()});
  }

  public getCodiciRichiesteAperte(nome: string, cognome: string): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-codici-richieste-aperte/${nome}/${cognome}`, {headers: header.header()});
  }

  public getCodiciRichiesteChiuse(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-codici-richieste-chiuse`, {headers: header.header()});
  }

  public salvaPriorita(array: JSON, ruolo: string): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/salva-priorita/${ruolo}`, array, {headers: header.header()});
  }

  public assegnazioneCandidati(listaCandidati: string, idRichiesta: number): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/assegna-candidati/${idRichiesta}`, listaCandidati, {headers: header.header()});
  }
}
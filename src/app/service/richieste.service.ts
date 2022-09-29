import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class RichiesteService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  public getRichiesteAperteAccount(idDipendente: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/all-richieste-aperte-account/${idDipendente}`);
  }

  public getRichiesteAperteCommerciale(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/all-richieste-aperte-commerciale`);
  }

  public getRichiesteAperteRecruiter(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/all-richieste-aperte-recruiter`);
  }

  public getRichiesteAperte(nomeCognome: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/all-richieste-aperte/${nomeCognome}`);
  }

  public getRichiesteChiuse(ruolo: string, nomeCognome: string, idDipendente: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/all-richieste-chiuse/${ruolo}/${nomeCognome}/${idDipendente}`);
  }

  public getRichiesta(idRichiesta: number, pagina: number, ruolo: string): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-richiesta/${idRichiesta}/${pagina}/${ruolo}`);
  }

  public eliminaRichiesta(idRichiesta: number, pagina: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/elimina-richiesta/${idRichiesta}/${pagina}`);
  }

  public updateRichiesta(updateForm: JSON, idRichiesta: number, idDipendente: number, pagina: number, ruolo: string): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/modifica-richiesta/${idRichiesta}/${idDipendente}/${pagina}/${ruolo}`, updateForm);
  }

  public getRecruiters(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiServerUrl}/get-nomi-recruiter`);
  }

  public addRichiesta(addForm: JSON): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/salva-richiesta`, addForm);
  }

  public getCodiciRichiesteAperteAccount(idDipendente: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-codici-richieste-aperte-account/${idDipendente}`);
  }

  public getCodiciRichiesteAperteCommerciale(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-codici-richieste-aperte-commerciale`);
  }

  public getCodiciRichiesteAperteRecruiter(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-codici-richieste-aperte-recruiter`);
  }

  public getCodiciRichiesteAperte(nomeCognome: string): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-codici-richieste-aperte/${nomeCognome}`);
  }

  public getCodiciRichiesteChiuse(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-codici-richieste-chiuse`);
  }

  public salvaPriorita(array: JSON): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/salva-priorita`, array);
  }
}
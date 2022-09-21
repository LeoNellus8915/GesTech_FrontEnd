import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class RichiesteService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  public getRichiesteAperte(ruolo: string, nomeCognome: string, idRisorsa: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/all-richieste-aperte/${ruolo}/${nomeCognome}/${idRisorsa}`);
  }

  public getRichiesteChiuse(ruolo: string, nomeCognome: string, idRisorsa: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/all-richieste-chiuse/${ruolo}/${nomeCognome}/${idRisorsa}`);
  }

  public getRichiesta(idRichiesta: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-richiesta/${idRichiesta}`);
  }

  public eliminaRichiesta(idRichiesta: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/elimina-richiesta/${idRichiesta}`);
  }

  public updateRichiesta(updateForm: JSON, idRichiesta: number, idRisorsa: number): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/modifica-richiesta/${idRichiesta}/${idRisorsa}`, updateForm);
  }

  public getRecruiters(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiServerUrl}/get-nomi-recruiter`);
  }

  public addRichiesta(addForm: JSON): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/salva-richiesta`, addForm);
  }
}
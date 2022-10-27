import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class CandidatiService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  public allCandidati(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/all-candidati`);
  }


  public getCandidatoVisualizza(idCandidato: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-candidato-visualizza/${idCandidato}`);
  }

  
  public getCandidatoModifica(idCandidato: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/get-candidato-modifica/${idCandidato}`);
  }

  public eliminaCandidato(idCandidato: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/elimina-candidato/${idCandidato}`);
  }

  public salvaCandidato(addForm: JSON): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/salva-candidato`, addForm);
  }

  public emailEsistente(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/controllo-email-modifica`, email);
  }

  public updateCandidato(updateForm: JSON, idCandidato: number, idRisorsa: number): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/modifica-candidato/${idCandidato}/${idRisorsa}`, updateForm);
  }

  public getCodiciCandidati(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-codici-candidati`);
  }
}
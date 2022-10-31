import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, header } from 'src/environments/environment';
import { Ruoli } from '../model/ruoli';

@Injectable({providedIn: 'root'})
export class RuoliService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  public getRuoli(): Observable<Ruoli[]> {
    return this.http.get<Ruoli[]>(`${this.apiServerUrl}/all-ruoli`, {headers: header.header()});
  }

  public getRuoliDipendenteAdmin(): Observable<Ruoli[]> {
    return this.http.get<Ruoli[]>(`${this.apiServerUrl}/all-ruoli-dipendente-admin`, {headers: header.header()});
  }

  public getRuoliDipendentePersonale(): Observable<Ruoli[]> {
    return this.http.get<Ruoli[]>(`${this.apiServerUrl}/all-ruoli-dipendente-personale`, {headers: header.header()});
  }
}
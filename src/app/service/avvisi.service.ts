import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, header } from 'src/environments/environment';
import { Avvisi } from '../model/avvisi';

@Injectable({providedIn: 'root'})
export class AvvisiService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  public allAvvisi(ruolo: string): Observable<Avvisi[]> {
    return this.http.get<Avvisi[]>(`${this.apiServerUrl}/get-avvisi/${ruolo}`, {headers: header.header()});
  }

  public salvaAvviso(addForm: JSON): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/salva-avviso`, addForm, {headers: header.header()});
  }

  public deleteAvviso(idAvviso: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/delete-avviso/${idAvviso}`, {headers: header.header()});
  }
}
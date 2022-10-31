import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, header } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class RisorseRichiesteService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public setVisualizzato(idRichiesta: number, idRisorsa: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/set-visualizzato/${idRichiesta}/${idRisorsa}`, {headers: header.header()});
  }
}
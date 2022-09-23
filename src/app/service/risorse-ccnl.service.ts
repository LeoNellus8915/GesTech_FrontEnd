import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RisorseCCNLService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public controlloDownload(idRisorsa: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/controllo-download/${idRisorsa}`);
  }

  public download(idRisorsa: any): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/download/${idRisorsa}`);
  }
}
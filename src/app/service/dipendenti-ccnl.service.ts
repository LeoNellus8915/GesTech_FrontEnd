import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, header } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DipendentiCCNLService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public controlloDownload(idRisorsa: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/controllo-download/${idRisorsa}`,{headers: header.header()});
  }

  public download(idRisorsa: any): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/download/${idRisorsa}`,{headers: header.header()});
  }
}
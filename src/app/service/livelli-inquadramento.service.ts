import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, header } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivelliInquadramentoService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  public getLivelliInquadramento(idCcnl: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/all-livelli-inquadramenti/${idCcnl}`, {headers: header.header()});
  }
}

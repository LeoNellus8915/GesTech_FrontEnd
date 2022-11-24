import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, header } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CCNLService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  public getCcnl(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/all-ccnl`, {headers: header.header()});
  }
}
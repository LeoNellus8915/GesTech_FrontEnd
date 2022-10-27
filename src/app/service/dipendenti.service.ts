import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, header } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DipendentiService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public allDipendenti(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/all-dipendenti`,{headers: header.header()});
  }

  public getDipendenti(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/get-dipendenti`,{headers: header.header()});
  }
}
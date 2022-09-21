import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aziende } from '../model/aziende';

@Injectable({providedIn: 'root'})
export class AziendeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  public getAziende(): Observable<Aziende[]> {
    return this.http.get<Aziende[]>(`${this.apiServerUrl}/all-aziende`);
  }
}
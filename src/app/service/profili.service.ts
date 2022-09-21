import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profili } from '../model/profili';

@Injectable({providedIn: 'root'})
export class ProfiliService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  public getProfili(): Observable<Profili[]> {
    return this.http.get<Profili[]>(`${this.apiServerUrl}/all-profili`);
  }
}
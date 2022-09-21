import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Linguaggi } from '../model/linguaggi';

@Injectable({providedIn: 'root'})
export class LinguaggiService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  public getLinguaggi(): Observable<Linguaggi[]> {
    return this.http.get<Linguaggi[]>(`${this.apiServerUrl}/all-linguaggi`);
  }
}
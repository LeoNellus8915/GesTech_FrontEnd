import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lingue } from '../model/lingue';

@Injectable({providedIn: 'root'})
export class LingueService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  public getLingue(): Observable<Lingue[]> {
    return this.http.get<Lingue[]>(`${this.apiServerUrl}/all-lingue`);
  }
}
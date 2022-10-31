import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, header } from 'src/environments/environment';
import { Livelli } from '../model/livelli';

@Injectable({providedIn: 'root'})
export class LivelliService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  public getLivelli(): Observable<Livelli[]> {
    return this.http.get<Livelli[]>(`${this.apiServerUrl}/all-livelli`, {headers: header.header()});
  }
}
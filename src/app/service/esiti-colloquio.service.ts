import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, header } from 'src/environments/environment';
import { EsitiColloquio } from '../model/esiti_colloquio';

@Injectable({providedIn: 'root'})
export class EsitiColloquioService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  public getEsitiColloquio(): Observable<EsitiColloquio[]> {
    return this.http.get<EsitiColloquio[]>(`${this.apiServerUrl}/all-esiti-colloquio`,{headers: header.header()});
  }
}
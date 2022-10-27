import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, header } from 'src/environments/environment';
import { Clienti } from '../model/clienti';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ClientiService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getClienti(): Observable<Clienti[]> {
    return this.http.get<Clienti[]>(`${this.apiServerUrl}/all-clienti`,{headers: header.header()});
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, header } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class TicketService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  public saveTicket(ticket: JSON): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/salva-ticket`, ticket, {headers: header.header()});
  }

  public getTicketsAperti(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-tickets-aperti`, {headers: header.header()});
  }

  public getTicketsChiusi(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-tickets-chiusi`, {headers: header.header()});
  }

  public chiudiTicket(idTicket: number): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/chiudi-ticket`, idTicket, {headers: header.header()});
  }
}
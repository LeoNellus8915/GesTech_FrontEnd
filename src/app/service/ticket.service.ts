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

  public getTicketsApertiAdmin(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-tickets-aperti-admin`, {headers: header.header()});
  }

  public getTicketsChiusiAdmin(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-tickets-chiusi-admin`, {headers: header.header()});
  }

  public getTicketsAperti(idDipendente: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-tickets-aperti/${idDipendente}`, {headers: header.header()});
  }

  public getTicketsChiusi(idDipendente: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-tickets-chiusi/${idDipendente}`, {headers: header.header()});
  }

  public chiudiTicket(idTicket: number): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/chiudi-ticket`, idTicket, {headers: header.header()});
  }
}
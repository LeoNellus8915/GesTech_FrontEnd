import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Beni } from '../model/beni';
import { hardware } from '../model/mapper/hardware';

@Injectable({providedIn: 'root'})
export class BeniService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  public allHardware(): Observable<hardware[]> {
    return this.http.get<hardware[]>(`${this.apiServerUrl}/all-hardware`);
  }

  public getBeneVisualizza(idBene: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-bene-visualizza/${idBene}`);
  }

  public getBeneModifica(idBene: string): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-bene-modifica/${idBene}`);
  }

  public salvaBene(addForm: Beni): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/salva-bene`, addForm);
  }

  public modificaBene(updateForm: Beni, codiceBene: string): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/modifica-bene/${codiceBene}`, updateForm);
  }

  public getCodiciBeni(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-codici-beni`);
  }
}
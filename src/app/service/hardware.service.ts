import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Beni } from '../model/beni';
import { hardware } from '../model/mapper/hardware';
import { dispositivi } from '../model/mapper/dispositivi';

@Injectable({providedIn: 'root'})
export class HardwareService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  public allHardware(): Observable<hardware[]> {
    return this.http.get<hardware[]>(`${this.apiServerUrl}/all-hardware`);
  }

  public getHardwareVisualizza(idHardware: string): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-hardware-visualizza/${idHardware}`);
  }

  public getHardwareModifica(idHardware: string): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-hardware-modifica/${idHardware}`);
  }

  public salvaHardware(addForm: hardware): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/salva-hardware`, addForm);
  }

  public modificaHardware(updateForm: hardware, codiceHardware: string): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/modifica-hardware/${codiceHardware}`, updateForm);
  }

  public getCodiciHardware(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/get-codici-hardware`);
  }

  public getAllDispositivi():Observable<dispositivi[]>{
    return this.http.get<dispositivi[]>(`${this.apiServerUrl}/get-all-dispositivi`);
  }
}
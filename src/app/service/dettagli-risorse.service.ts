import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class DettagliRisorseService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
}
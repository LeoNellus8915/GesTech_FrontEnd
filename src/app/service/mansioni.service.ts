import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class MansioniService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
}
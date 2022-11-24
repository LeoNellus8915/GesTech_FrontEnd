import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, header } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class UploadExcelService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  public getRuoliDipendentePersonale(array: any): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/import-file-excel`, array, {headers: header.header()});
  }
}
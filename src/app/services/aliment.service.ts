import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Aliment } from '../models/aliment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlimentService {
  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  getAliments(): Observable<Aliment[]> {
    return this.http.get<Aliment[]>('http://localhost:3000/api/aliments');
  }

  createAliment(aliment: Aliment): Observable<Aliment> {
    // recup le token dans le localstorage
    // const headers = this.setHeaders();
    const headers = this.setHeaders();
    return this.http.post<Aliment>(
      `http://localhost:3000/api/aliments`,
      aliment,
      { headers }
    );
  }
}

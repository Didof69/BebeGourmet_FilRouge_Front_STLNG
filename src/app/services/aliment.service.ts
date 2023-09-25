import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Aliment } from '../models/aliment';
import { Observable } from 'rxjs';
import { CreateAliment } from '../models/createAliment';

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

  createAliment(aliment: CreateAliment): Observable<Aliment> {
    // recup le token dans le localstorage
    // const headers = this.setHeaders();
    const headers = this.setHeaders();
    return this.http.post<Aliment>(
      `http://localhost:3000/api/aliments`,
      aliment,
      { headers }
    );
  }

  getAlimentById(alimentId: number): Observable<Aliment> {
    // const headers = this.setHeaders();
    return this.http.get<Aliment>(
      `http://localhost:3000/api/aliments/${alimentId}`
    );
  }

  updateAliment(
    alimentID: number,
    aliment: CreateAliment
  ): Observable<Aliment> {
    const headers = this.setHeaders();
    return this.http.patch<Aliment>(
      `http://localhost:3000/api/aliments/${alimentID}`,
      aliment,
      {
        headers,
      }
    );
  }

  deleteAliment(aliment: Aliment): Observable<Aliment> {
    // recup le token dans le localstorage
    const headers = this.setHeaders();
    // console.log(headers);
    return this.http.delete<Aliment>(
      `http://localhost:3000/api/aliments/${aliment.id}`,
      { headers }
    );
  }
}

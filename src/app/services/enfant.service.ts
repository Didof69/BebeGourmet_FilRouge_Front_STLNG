import { Injectable } from '@angular/core';
import { Enfant } from '../models/enfant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnfantService {
  private baseApiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  getProfilEnfant(idEnfant: number): Observable<Enfant> {
    const headers = this.setHeaders();
    return this.http.get<Enfant>(`${this.baseApiUrl}/enfants/${idEnfant}`, {
      headers,
    });
  }

  updateEnfant(enfant: Enfant): Observable<Enfant> {
    const headers = this.setHeaders();
    return this.http.patch<Enfant>(
      `http://localhost:3000/api/enfants/${enfant.id}`,
      enfant,
      {
        headers,
      }
    );
  }
}

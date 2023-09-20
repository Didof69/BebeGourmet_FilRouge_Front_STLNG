import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';
import { LoginUtilisateur } from '../models/loginUtilisteur';
import { ReponseConnexion } from '../models/reponseConnexion';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  private baseApiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }
  
  inscriptionUtilisateur(data: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(
      `${this.baseApiUrl}/auth/register`,
      data
    );
  }

  connexionUtilisateur(data: LoginUtilisateur): Observable<ReponseConnexion> {
    return this.http.post<ReponseConnexion>(
      `${this.baseApiUrl}/auth/login`,
      data
    );
  }

  getProfilUtilisateur(): Observable<Utilisateur>{
    const headers = this.setHeaders();
    return this.http.get<Utilisateur>(
      `${this.baseApiUrl}/utilisateurs`,
      { headers }
    );
   };

}

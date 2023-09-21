import { Injectable } from '@angular/core';
import { Saison } from '../models/saison';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SaisonService {
  constructor(private http : HttpClient) {}

  getSaisons(): Observable<Saison[]> {
    return this.http.get<Saison[]>('http://localhost:3000/api/saisons');
  }
}

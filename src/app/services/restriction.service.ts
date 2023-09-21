import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restriction } from '../models/restriction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestrictionService {
  constructor(private http: HttpClient) {}

  getRestrictions(): Observable<Restriction[]> {
    return this.http.get<Restriction[]>(
      'http://localhost:3000/api/restrictions'
    );
  }
}

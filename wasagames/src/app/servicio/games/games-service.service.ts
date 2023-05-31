import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly baseUrl = 'http://localhost:3000'; // URL base para las peticiones al servidor

  constructor(private http: HttpClient) { }
  getGames(): Observable<any> {
    const url = `${this.baseUrl}/games`;
    return this.http.get<any>(url);
  }
  getGame(id:number): Observable<any> {
    const url = `${this.baseUrl}/games/${id}`;
    return this.http.get<any>(url);
  }
}

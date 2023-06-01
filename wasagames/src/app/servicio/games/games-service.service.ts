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
  addGames(data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.baseUrl + "/carrito/add-game", JSON.stringify(data), { headers: headers });
  }
  getCart(id:number): Observable<any> {
    const url = `${this.baseUrl}/carrito/${id}/compra/false`;
    return this.http.get<any>(url);
  }
  getMygames(id:number): Observable<any> {
    const url = `${this.baseUrl}/carrito/${id}/compra/true`;
    return this.http.get<any>(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'http://localhost:3000'; // URL base para las peticiones al servidor

  constructor(private http: HttpClient) { }

  // Método para obtener un usuario por su email y contraseña
  getUser(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/users/login/${email}/${password}`;
    return this.http.get<any>(url);
  }

  // Método para obtener un usuario por su email
  getmail(email: string): Observable<any> {
    const url = `${this.baseUrl}/users/find/${email}}`;
    return this.http.get<any>(url);
  }

  // Método para obtener información de un usuario por su ID
  getinfous(id: string): Observable<any> {
    const url = `${this.baseUrl}/usersget?idu=${id}`;
    return this.http.get<any>(url);
  }

  // Método para crear un nuevo usuario
  createUser(data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.baseUrl + "/users", JSON.stringify(data), { headers: headers });
  }

  // Método para crear un nuevo usuario
  createUs(data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.baseUrl + "/createUs", JSON.stringify(data), { headers: headers });
  }

  // Método para verificar si un email existe en la base de datos
  verifyEmail(email:string): Observable<any> {
    const url = `${this.baseUrl}/users/exists?email=${email}`;
    return this.http.get<any>(url);
  }

  // Método para eliminar un usuario por su ID
  deleteUser(id: string): Observable<any> {
    const url = `${this.baseUrl}/usersd?id=${id}`;
    return this.http.delete<any>(url);
  }

  // Método para actualizar un usuario
  updateUser(user_id: string, data: any): Observable<any> {
    const url = `${this.baseUrl}/usersUpdate?id=${user_id}`;
    return this.http.put<any>(url, data);
  }

  // Método para obtener usuarios por su rol
  getUserByRole(role: string): Observable<any> {
    const url = `${this.baseUrl}/usersr?role=${role}`;
    return this.http.get<any>(url);
  }


  // Método para obtener el carrito de un usuario
  getUserCart(userID: string): Observable<any> {
    const url = `${this.baseUrl}/Cart_user?userID=${userID}`;
    return this.http.get<any>(url);
  }

  // Método para obtener los juegos de un usuario, falta crear v:
  getTicket_user(userID: string): Observable<any> {
    const url = `${this.baseUrl}/Ticket_user?userID=${userID}`;
    return this.http.get<any>(url);
  }

  // Método para obtener la información de un usuario
  getUserinfo(userID: string): Observable<any> {
    const url = `${this.baseUrl}/Userinfo?userID=${userID}`;
    return this.http.get<any>(url);
  }

  // Método para actualizar la información de un usuario
  updateUserInfo(userID: string, userData: any): Observable<any> {
    const url = `${this.baseUrl}/Userinfo?userID=${userID}`;
    return this.http.put<any>(url, userData);
  }

  // Método para crear un nuevo carrito
  createCart(data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.baseUrl + "/Cart", JSON.stringify(data), { headers: headers });
  }

  // Método para eliminar el carrito de un usuario
  deleteCart(userID:string): Observable<any> {
    const url = `${this.baseUrl}/Cart?userID=${userID}`;
    return this.http.delete<any>(url);
  }

}

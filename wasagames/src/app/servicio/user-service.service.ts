import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'http://localhost:5000'; // URL base para las peticiones al servidor

  constructor(private http: HttpClient) { }

  // Método para obtener un usuario por su email y contraseña
  getUser(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/users?email=${email}&password=${password}`;
    return this.http.get<any>(url);
  }

  // Método para obtener un usuario por su email
  getmail(email: string): Observable<any> {
    const url = `${this.baseUrl}/user-by-email?email=${email}}`;
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
    return this.http.post<any>(this.baseUrl + "/create", JSON.stringify(data), { headers: headers });
  }

  // Método para crear un nuevo evento
  createEvent(data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.baseUrl + "/create_event", JSON.stringify(data), { headers: headers });
  }

  // Método para crear un nuevo ticket
  createTicket(data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.baseUrl + "/Tickets_Create", JSON.stringify(data), { headers: headers });
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

  // Método para obtener eventos
  getEvents(): Observable<any[]> {
    const url = `${this.baseUrl}/Events`;
    return this.http.get<any[]>(url);
  }

  // Método para obtener eventos por categoría
  getEventbyCate(categoria:string): Observable<any[]> {
    const url = `${this.baseUrl}/Events_Category?categoria=${categoria}`;
    return this.http.get<any[]>(url);
  }

  // Método para obtener tickets disponibles
  getTicketAvalibity(disponible: string): Observable<any> {
    const url = `${this.baseUrl}/Tickets_Avalibity?disponible=${disponible}`;
    return this.http.get<any>(url);
  }

  // Método para obtener tickets de un evento
  getTicketEvent(id_event: string): Observable<any> {
    const url = `${this.baseUrl}/TicketsE?id_event=${id_event}`;
    return this.http.get<any>(url);
  }

  // Método para obtener un ticket por su ID
  getTicketID(_id: string): Observable<any> {
    const url = `${this.baseUrl}/Tickets?_id=${_id}`;
    return this.http.get<any>(url);
  }

  // Método para obtener el carrito de un usuario
  getUserCart(userID: string): Observable<any> {
    const url = `${this.baseUrl}/Cart_user?userID=${userID}`;
    return this.http.get<any>(url);
  }

  // Método para obtener los tickets de un usuario
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

  // Método para obtener un evento por su ID
  getEventID(id_event: string): Observable<any> {
    const url = `${this.baseUrl}/EventsID?id_event=${id_event}`;
    return this.http.get<any>(url);
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

  // Método para actualizar la disponibilidad de un ticket
  updateTicketDis(data: any): Observable<any> {
    const url = `${this.baseUrl}/Tickets_Ava`;
    return this.http.put<any>(url, data);
  }

  // Método para crear un nuevo ticket de usuario
  createuserTicketsave(data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.baseUrl + "/createT_U", JSON.stringify(data), { headers: headers });
  }
}

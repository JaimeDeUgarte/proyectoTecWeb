import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthSetatusService {
  private loggedIn: string | null = null;

  setLoggedIn(value: string) {
    this.loggedIn = value;
  }

  getLoggedIn(): string | null {
    return this.loggedIn;
  }
}


import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  login(username: string, password: string): boolean {
    // Mock login - replace with actual authentication
    // if (username === 'admin' && password === 'admin') {
    //   this.isAuthenticated.next(true);
    //   return true;
    // }
    return false;
  }

  logout() {
    this.isAuthenticated.next(false);
  }
}
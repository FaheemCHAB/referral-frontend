import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private AP1_URL = environment.API_URL;
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

   // logout
   logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser'); // Remove from localStorage
  }

  authenticateUser(username: string, password: string) {
    return this.http.post<{ success: boolean; user: User }>(`${this.AP1_URL}/user/authenticate`, { username, password }).pipe(
      tap((response) => {
        if (response && response.user && response.user.name) {
          this.currentUserSubject.next(response.user);
          localStorage.setItem('currentUser', JSON.stringify(response.user)); // Save to localStorage
        } else {
          console.warn('User name not found in the response');
          this.currentUserSubject.next(null);
        }
      }),
      catchError((error) => {
        console.error('API call failed:', error);
        return throwError(() => error);
      })
    );
  }

  // Method to retrieve the user from localStorage
  getStoredUser(): User | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }
}
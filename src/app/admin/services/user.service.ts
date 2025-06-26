import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.API_URL

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<User []>(`${this.API_URL}/user`);
  }

  createUser(user: any) {
    return this.http.post(`${this.API_URL}/user`, user);
  }

  toggleUserStatus(userId: string) {
    return this.http.patch(`${this.API_URL}/user/${userId}`, {
      status: true
    });
  }

  updateUser(user: Partial<User>): Observable<User>{
    return this.http.put<User>(`${this.API_URL}/user/${user._id}`,user);
  }

  searchUsers(query: string) {
    return this.http.get<User[]>(`${this.API_URL}/user/search`, { params: { query } });
  }

  getUsersByDateRange(startDate: string, endDate: string) {
    return this.http.get<User[]>(`${this.API_URL}/user/date-range`, { params: { startDate, endDate } });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private API_URL = environment.API_URL

  constructor(private http: HttpClient) { }


  getUserStatusCount(userId: string) {
    return this.http.get<User>(`${this.API_URL}/user/referral-counts/${userId}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Referral } from '../models/referral.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReferralService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getAllReferrals() {
  return this.http.get<Referral[]>(`${this.API_URL}/referral`);
  }

  updateReferralStatus(referralId: string, newStatus: string) {
    console.log('Sending Referral ID:', referralId);
    console.log('Sending Status:', newStatus);
    return this.http.patch<Referral>(`${this.API_URL}/referral/${referralId}`, {
      attendanceStatus: newStatus
    });
  }

  searchReferralsByReferredBy(referredBy: string, startDate: string , endDate: string) {
    return this.http.get<Referral[]>(`${this.API_URL}/referral/search-by-referred-by`, { params: { referredBy , startDate, endDate }  });

  }

  searchByName(name: string) {
    return this.http.get<Referral[]>(`${this.API_URL}/referral/search-by-name`, { params: { name } });
  }

  getTotalReferrals(): Observable<number> {
    return this.http.get<{ count: number }>(`${this.API_URL}/referral/count`)
      .pipe(
        map(response => response.count) 
      );
  }

  getReferralStatusCounts(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.API_URL}/referral/status-counts`);
  }

  getTotalRegistrations(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/referral/registrations/count`);
  }

  getRecentReferrals(): Observable<Referral[]> {
    return this.http.get<Referral[]>(`${this.API_URL}/referral/recent`);
  }

  getJoinedReferralsByUserId(userId: string): Observable<Referral[]> {
    return this.http.get<Referral[]>(`${this.API_URL}/referral/joined-referrals/${userId}`);
  }

}

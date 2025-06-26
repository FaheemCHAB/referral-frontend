import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Referral } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReferralService {

  private API_URL = environment.API_URL;

constructor(private http: HttpClient){}

  private referrals: Referral[] = [];

  private referralsSubject = new BehaviorSubject<Referral[]>(this.referrals);
  referrals$ = this.referralsSubject.asObservable();

  // addReferral(referral: Omit<Referral, 'id' | 'status'>) {
  //   const newReferral: Referral = {
  //     ...referral,
  //     _id: this.referrals.length + 1,
  //     status: false
  //   };
  //   this.referrals.push(newReferral);
  //   this.referralsSubject.next(this.referrals);
  // }

  getReferralsByUserId(userId: string) {
    return this.http.get<Referral[]>(`${this.API_URL}/referral/${userId}`);
  }

  seachReferralByUserId(userId: string) {
    return this.http.get<Referral[]>(`${this.API_URL}/referral/search-by-user`, { params: { userId } });
  }
  toggleStatus(id: string) {
    // const referral = this.referrals.find(r => r._id === id);
    // if (referral) {
    //   referral.status = !referral.status;
    //   this.referralsSubject.next(this.referrals);
    // }
  }

  createReferral(referrals: any) {
    return this.http.post(`${this.API_URL}/referral`, referrals);
  }
}
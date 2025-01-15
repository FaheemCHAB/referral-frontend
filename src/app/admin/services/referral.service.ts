import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Referral } from '../models/referral.model';

@Injectable({
  providedIn: 'root'
})
export class ReferralService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getAllReferrals() {
  return this.http.get<Referral[]>(`${this.API_URL}/referral`);
  }

}

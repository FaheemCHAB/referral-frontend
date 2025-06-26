import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Bonus, BonusHistory } from '../models/bonus.model';

@Injectable({
  providedIn: 'root'
})
export class BonusService {

  private API_URL = environment.API_URL

  constructor(private http: HttpClient) { }

  getAllBonuses() {
    return this.http.get<Bonus[]>(`${this.API_URL}/bonus`);
  }

  createBonus(bonus: any) {
    return this.http.post(`${this.API_URL}/bonus`, bonus);
  }

  getBonusesByUserId(userId: string) {
    return this.http.get<Bonus[]>(`${this.API_URL}/bonus/${userId}`);
  }

  updateBonusStatus(bonusId: string, status: string) {
    return this.http.patch(`${this.API_URL}/bonus/change-status/${bonusId}`, { status: status });
  }

  updateBonusByUserId(bonusId: string, bonus: any) {
    return this.http.put<BonusHistory>(`${this.API_URL}/bonus/${bonusId}`, bonus);
  }

  
}

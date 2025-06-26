import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Reward, RewardHistory } from '../models/rewards.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {
  
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getRewards() {
    return this.http.get<Reward []>(`${this.API_URL}/reward`);
  }

  // getUserRewards(userId: string): Observable<Reward[]> {
  //   return this.http.get<Reward[]>(`${this.API_URL}/reward/${userId}`);
  // }

  getRewardsByUserId(userId: string) {
    return this.http.get<Reward[]>(`${this.API_URL}/reward/${userId}`);
  }

  addReward(reward: any) {
    return this.http.post(`${this.API_URL}/reward`, reward);
  }
  updateReward(id: string, reward: any) {
    return this.http.put(`${this.API_URL}/reward/${id}`, reward);
  }

  updateRewardStatus(userId: string, newStatus: string) {
    return this.http.patch<Reward>(`${this.API_URL}/reward/change-status/${userId}`, { status: newStatus });
  }

  updateRewardByRewardId(rewardId: string, reward: any) {
    return this.http.put<RewardHistory>(`${this.API_URL}/reward/${rewardId}`, reward);
  }
}

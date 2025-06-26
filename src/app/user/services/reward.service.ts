import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Reward } from "../models/reward";
import { Leaderboard } from "../models/leaderBoard";
import { Bonus } from "../models/bonus";

@Injectable({
  providedIn: "root",
})
export class RewardService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  getRewardsByUserId(userId: string) {
    return this.http.get<Reward[]>(`${this.API_URL}/reward/${userId}`);
  }

  getAllUserRewards() {
    return this.http.get<Leaderboard[]>(`${this.API_URL}/reward/bonus-count`);
  }

  getBonusesByUserId(userId: string) {
    return this.http.get<Bonus[]>(`${this.API_URL}/bonus/${userId}`);
  }

  getAllUserBonus() {
    return this.http.get<Bonus[]>(`${this.API_URL}/bonus`);
  }
}

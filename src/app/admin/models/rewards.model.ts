import { User } from "./user.model";

export interface RewardHistory {
  _id: string;
  amount: number;
  bonusPoints: number;
  date: Date;
  status: string;
  remarks: string;
}

export interface Reward {
  _id: string;
  user: User;
  amount: number;
  bonusPoints: number;
  status: 'pending' | 'processing' | 'paid';
  history: RewardHistory[]; // Add the history array
  createdAt: Date;
  updatedAt: Date;
}
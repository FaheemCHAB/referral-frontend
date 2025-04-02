import { User } from "./user.model";

export interface RewardHistory {
editedAmount: any;

  _id: string;
  amount: number;
  bonusPoints: number;
  date: Date;
  status: string;
  remarks: string;
  editing?: boolean;
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
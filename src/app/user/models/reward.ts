import { User } from "./user";

export interface History {
    amount: number;
    bonusPoints: number;
    date: Date; // Since the backend sends a string, keep it as string or convert it to Date while using
    status: string;
    _id: string;
  }

export interface Reward {
    id: number;
    status: string;
    amount: number;
    bonusPoints: number;
    user: User;
    history: History[];
}
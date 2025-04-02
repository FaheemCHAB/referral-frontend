import { User } from "./user.model";

export interface BonusHistory {
    _id: string;
    remarks: string;
    bonusPoints: number;
    status: string;
    date: Date;
    editing?: boolean;
    amount: number;
}

export interface Bonus {
    _id: string;
    user: User;
    bonusPoints: number;
    amount: number;
    history: BonusHistory[];
    createdAt: Date;
    updatedAt: Date;

} 
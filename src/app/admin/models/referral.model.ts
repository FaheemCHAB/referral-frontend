export interface Referral {
  _id: string;
  name: string;
  referredBy: {
    id: string;
    name: string;
  };
  mobile: string;
  status: string;
  place: string;
  qualification: string;
  age: number;
  email: string;
  createdAt: Date;
}
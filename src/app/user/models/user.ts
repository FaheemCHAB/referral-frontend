export interface User {
  _id: string;
  username: string;
  name: string;
  createdAt: Date;
}

export interface Referral {
  _id: string;
  name: string;
  mobile: string;
  isActive: boolean;
  email: string;
  place: string;
  age: number | null
  qualification: string;
  createdAt: Date;
}
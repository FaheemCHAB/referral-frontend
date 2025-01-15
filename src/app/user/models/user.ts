export interface User {
  _id: string;
  username: string;
  name: string;
  createdAt: Date;
}

export interface Referral {
  _id: string;
  name: string;
  mobile: number | null;
  status: string;
  email: string;
  place: string;
  age: number | null
  qualification: string;
  createdAt: Date;
}
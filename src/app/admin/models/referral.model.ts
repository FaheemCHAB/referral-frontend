export interface Referral {
  _id: string;
  name: string;
  referredBy: {
    _id: string;
    name: string;
  };
  mobile: string;
  isActive: boolean;
  place: string;
  qualification: string;
  dob: string;
  email: string;
  createdAt: Date;
}
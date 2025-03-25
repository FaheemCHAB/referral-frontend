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
  passOutYear: string;
  attendanceStatus: "not-attended" | "attended" | "registered" | "joined";
  email: string;
  createdAt: Date;
  status: string; // Add this field
}
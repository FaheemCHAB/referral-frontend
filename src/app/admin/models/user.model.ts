export interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  username: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  statusCounts: {
    totalLeads: number;
    attended: number;
    notAttended: number;
    registered: number;
    joined: number;
  };
  referralCount?: number; // Add this line
}
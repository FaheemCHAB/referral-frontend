export interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  username: string;
  password: string;
  status: boolean;
  isActive: boolean;
  createdAt: Date;
}
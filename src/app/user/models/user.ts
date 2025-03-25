export interface User {
  _id: string;
  username: string;
  name: string;
  totalLeads: 0;
  attended: 0;
  notAttended: 0;
  registered: 0;
  joined: 0;
  createdAt: Date;
}

export interface Referral {
  _id: string;
  name: string;
  mobile: string;
  attendanceStatus: string;
  email: string;
  place: string;
  passOutYear: string;
  careerStage: string;
  remarks: string;
  areaOfInterest: string;
  otherInterest: string
  qualification: string;
  createdAt: Date;
}

export interface UserProfile {
  userId: string;
  name: string;
  address: string;
  year: number;
  month: number;
  day: number;
  gender: 'male' | 'female';
  email: string;
  tel: number;
  introduce: string;
  school: string;
  belongs: string;
  state: string;
  tagOne: string;
  tagSecond: string;
  possibleDay: string;
}

export interface CompanyProfile {
  name: string;
  occupatioName: string;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  terms: boolean;
}

export interface UserProfile {
  userId: string;
  photoURL: File;
  name: string;
  address: string;
  year: number;
  month: number;
  day: number;
  gender: 'male' | 'female';
  email: string;
  tel: number;
  introduce: string;
}

export interface CompanyProfile {
  companyUserId: string;
  name: string;
  department: string;
  lastName: string;
  firstName: string;
  tel: number;
  email: string;
  password: string;
}

import { firestore } from 'firebase';
import { CompanyProfile } from './profile';

export interface JobList {
  id: string;
  jobId: string;
  companyName: string;
  title: string;
  jobImageUrls: string[];
  workPlace: string;
  occupation: string;
  salary: string;
  workTime: string;
  likedCount: number;
}

export interface DetailJob extends JobList {
  label: string[];
  companyContent: string;
  welfare: string;
  createdAt: firestore.Timestamp;
  companyEmail: string;
}

export interface Favorite {
  userId: string;
  id: string;
  likedCount: number;
}

export interface JobWidhFavorite extends DetailJob {
  likeAuthor: Favorite;
}

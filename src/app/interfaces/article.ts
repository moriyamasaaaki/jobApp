import { firestore } from 'firebase';

export interface JobList {
  id: string;
  jobId: string;
  companyName: string;
  title: string;
  jobImageUrls: string[];
  workPlace: string;
  salary: string;
  likedCount: number;
}

export interface DetailJob extends JobList {
  label: string[];
  companyContent: string;
  jobContent: string;
  createdAt: firestore.Timestamp;
  companyEmail: string;
  url: string;
}

export interface Favorite {
  userId: string;
  id: string;
  likedCount: number;
}

export interface JobWidhFavorite extends DetailJob {
  likeAuthor: Favorite;
}

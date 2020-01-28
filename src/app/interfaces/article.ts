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
  date: Date;
  companyContent: string;
  welfare: string;
  createAt: Date;
}

export interface Favorite {
  userId: string;
  id: string;
  likedCount: number;
}

export interface JobWidhFavorite extends DetailJob {
  likeAuthor: Favorite;
}

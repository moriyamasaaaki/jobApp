export interface JobList {
  companyName: string;
  title: string;
  recruitmentImg: string;
  workPlace: string;
  occupation: string;
  salary: {
    min: number;
    max: number;
  };
  workTime: string;
}

export interface DetailJob extends JobList {
  label: string[];
  date: Date;
  companyContent: string;
  welfare: string;
}

export interface AttentionJob {
  recruitmentImg: string;
  companyName: string;
  workPlace: string;
  salary: {
    min: number;
    max: number;
  };
}

export interface NewJob {
  companyName: string;
  title: string;
  workPlace: string;
}

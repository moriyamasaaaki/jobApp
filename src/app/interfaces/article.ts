export interface Article {
  title: string;
  label: string[];
  companyName: string;
  date: Date;
  companyContent: string;
  occupation: string;
  salary: {
    min: number;
    max: number;
  };
  welfare: string;
  workTime: string;
  workPlace: string;
  recruitmentImg: string;
}

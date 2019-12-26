import { Component, OnInit } from '@angular/core';
import { JobList } from 'src/app/interfaces/article';

@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.scss']
})
export class JoblistComponent implements OnInit {
  article: JobList = {
    jobId: '1',
    companyName: '株式会社Tokyo bite',
    title: '求人の詳細が表示されます。',
    recruitmentImg: '/assets/images/job1.jpg',
    workPlace: '東京',
    occupation: 'エンジニア',
    salary: '1200',
    workTime: '10:00~18:00'
  };

  jobLists = new Array(5).fill(null);

  constructor() {}

  ngOnInit() {}
}

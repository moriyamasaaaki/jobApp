import { Component, OnInit } from '@angular/core';
import { JobList } from 'src/app/interfaces/article';

@Component({
  selector: 'app-keep',
  templateUrl: './keep.component.html',
  styleUrls: ['./keep.component.scss']
})
export class KeepComponent implements OnInit {
  article: JobList = {
    companyName: '株式会社Tokyo biteaa',
    title: 'タイトルが入ります。',
    recruitmentImg: 'assets/images/job3.jpg',
    workPlace: '渋谷駅',
    occupation: 'フロント、サーバー、iOS、機械学習、データサイエンティスト',
    salary: {
      min: 1200,
      max: 1500
    },
    workTime: '08:00～18:00'
  };

  jobs = new Array(5).fill(null);

  constructor() {}

  ngOnInit() {}
}

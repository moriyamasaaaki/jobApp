import { Component, OnInit, Input } from '@angular/core';
import { DetailJob } from 'src/app/interfaces/article';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  article: DetailJob = {
    title: 'タイトル',
    label: ['週２からOK', '未経験大歓迎'],
    companyName: '会社名',
    date: new Date(),
    companyContent: '会社概要が入ります。',
    occupation: '職種が入ります。',
    salary: {
      min: 1200,
      max: 1300
    },
    welfare: 'あり',
    workTime: '18:00〜22：00',
    workPlace: '東京、新宿',
    recruitmentImg: '/assets/images/job3.jpg'
  };

  constructor() {}

  ngOnInit() {}
}

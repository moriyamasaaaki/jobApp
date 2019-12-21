import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keep',
  templateUrl: './keep.component.html',
  styleUrls: ['./keep.component.scss']
})
export class KeepComponent implements OnInit {
  job = {
    companyName: '株式会社サイバーエージェント',
    title: 'Go経験のあるエンジニア募集',
    img: 'assets/images/job3.jpg',
    place: '渋谷駅',
    occupation: 'フロント、サーバー、iOS、機械学習、データサイエンティスト',
    salary: 2000,
    workTime: '08:00～18:00'
  };

  jobs = new Array(5).fill(this.job);

  constructor() {}

  ngOnInit() {}
}

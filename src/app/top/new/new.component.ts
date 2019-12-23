import { Component, OnInit } from '@angular/core';
import { NewJob } from 'src/app/interfaces/article';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  article: NewJob = {
    companyName: '株式会社Tokyo bite',
    title: 'やる気さえあればプロフェッショナルに育てます！即戦力も大歓迎！！',
    workPlace: '品川駅から徒歩５分'
  };

  news = new Array(10).fill(null);

  constructor() {}

  ngOnInit() {}
}

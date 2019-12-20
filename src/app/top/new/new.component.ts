import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  new = {
    companyName: '株式会社アカツキ',
    title: 'やる気さえあればプロフェッショナルに育てます！即戦力も大歓迎！！',
    place: '品川駅から徒歩５分'
  };

  news = new Array(10).fill(this.new);

  constructor() {}

  ngOnInit() {}
}

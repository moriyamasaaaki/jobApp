import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/article';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  // @Input() article: Article;

  article: Article = {
    title: 'タイトル',
    tagu: 'タグ',
    companyName: '会社名',
    date: new Date(),
    companyContent:  '会社概要が入ります。',
    occupation: '職種が入ります。',
    salary: '1000〜1200円',
    welfare: 'あり',
    workTime: '18:00〜22：00',
    workPlace: '東京、新宿',
    recruitmentImg: '/assets/images/job3.jpg'
  };

  constructor() { }

  ngOnInit() {
  }

}

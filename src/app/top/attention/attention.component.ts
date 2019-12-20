import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attention',
  templateUrl: './attention.component.html',
  styleUrls: ['./attention.component.scss']
})
export class AttentionComponent implements OnInit {
  attention = {
    img: 'assets/images/job3.jpg',
    companyName: '株式会社メルカリ',
    place: '六本木駅',
    salary: '時給2000円'
  };

  attentions = new Array(3).fill(this.attention);

  constructor() {}

  ngOnInit() {}
}

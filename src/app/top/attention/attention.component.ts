import { Component, OnInit } from '@angular/core';
import { AttentionJob } from 'src/app/interfaces/article';

@Component({
  selector: 'app-attention',
  templateUrl: './attention.component.html',
  styleUrls: ['./attention.component.scss']
})
export class AttentionComponent implements OnInit {
  article: AttentionJob = {
    jobId: '1',
    recruitmentImg: '/assets/images/job3.jpg',
    companyName: '株式会社tokyo bite',
    workPlace: '六本木駅',
    salary: '1000~1200円'
  };

  attentions = new Array(3).fill(null);

  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit, Input } from '@angular/core';
import { DetailJob } from 'src/app/interfaces/article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {
  @Input() job: DetailJob;
  label: string;

  constructor(private router: Router) {
    if (this.router.url === '/') {
      this.label = '新着';
    } else {
      return;
    }
  }

  ngOnInit() {}
}

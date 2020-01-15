import { Component, OnInit } from '@angular/core';
import { DetailJob } from 'src/app/interfaces/article';
import { Observable } from 'rxjs';
import { JobPostService } from 'src/app/service/job-post.service';

@Component({
  selector: 'app-attention',
  templateUrl: './attention.component.html',
  styleUrls: ['./attention.component.scss']
})
export class AttentionComponent implements OnInit {
  articles$: Observable<DetailJob[]> = this.jobPostService.getAttentionJobs();

  constructor(private jobPostService: JobPostService) {}

  ngOnInit() {}
}

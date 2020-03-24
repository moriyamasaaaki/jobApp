import { Component, OnInit } from '@angular/core';
import { DetailJob } from 'src/app/interfaces/article';
import { Observable } from 'rxjs';
import { JobPostService } from 'src/app/services/job-post.service';

@Component({
  selector: 'app-joblist',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JoblistComponent implements OnInit {
  jobs$: Observable<DetailJob[]> = this.jobPostService.getAllJobs();

  constructor(private jobPostService: JobPostService) {}

  ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { JobList, DetailJob } from 'src/app/interfaces/article';
import { JobPostService } from 'src/app/service/job-post.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-keep',
  templateUrl: './keep.component.html',
  styleUrls: ['./keep.component.scss']
})
export class KeepComponent implements OnInit {
  article$: Observable<DetailJob> = this.jobPostService.getJobPost(
    this.authService.uid
  );

  jobs = new Array(5).fill(null);

  constructor(
    private jobPostService: JobPostService,
    private authService: AuthService
  ) {}

  ngOnInit() {}
}

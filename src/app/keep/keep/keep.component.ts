import { Component, OnInit } from '@angular/core';
import { DetailJob } from 'src/app/interfaces/article';
import { JobPostService } from 'src/app/service/job-post.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-keep',
  templateUrl: './keep.component.html',
  styleUrls: ['./keep.component.scss']
})
export class KeepComponent implements OnInit {
  constructor(
    private jobPostService: JobPostService,
    private authService: AuthService
  ) {}

  jobs$: Observable<DetailJob[]> = this.jobPostService.getLikedJobs(
    this.authService.uid
  );

  deleteLikedJob(job: DetailJob) {
    const joblikeId = job.id;
    this.jobPostService.deleteLikedJobs(this.authService.uid, joblikeId);
  }

  ngOnInit() {}
}

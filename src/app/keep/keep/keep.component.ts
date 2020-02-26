import { Component, OnInit } from '@angular/core';
import { DetailJob } from 'src/app/interfaces/article';
import { JobPostService } from 'src/app/services/job-post.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LikedService } from 'src/app/services/liked.service';

@Component({
  selector: 'app-keep',
  templateUrl: './keep.component.html',
  styleUrls: ['./keep.component.scss']
})
export class KeepComponent implements OnInit {
  constructor(
    private jobPostService: JobPostService,
    private authService: AuthService,
    private likedService: LikedService
  ) {}

  jobs$: Observable<DetailJob[]> = this.likedService.getLikedJobs(
    this.authService.uid
  );

  deleteLikedJob(job: DetailJob) {
    const joblikeId = job.id;
    this.likedService.deleteLikedJobs(this.authService.uid, joblikeId);
  }

  ngOnInit() {}
}

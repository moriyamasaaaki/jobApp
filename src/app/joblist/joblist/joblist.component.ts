import { Component, OnInit } from '@angular/core';
import { DetailJob } from 'src/app/interfaces/article';
import { Observable } from 'rxjs';
import { JobPostService } from 'src/app/service/job-post.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.scss']
})
export class JoblistComponent implements OnInit {
  article$: Observable<DetailJob> = this.jobPostService.getJobPost(
    this.authService.uid
  );

  jobLists = new Array(5).fill(null);

  constructor(
    private jobPostService: JobPostService,
    private authService: AuthService
  ) {}

  ngOnInit() {}
}

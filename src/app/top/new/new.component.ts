import { Component, OnInit } from '@angular/core';
import { DetailJob } from 'src/app/interfaces/article';
import { Observable } from 'rxjs';
import { JobPostService } from 'src/app/service/job-post.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  article$: Observable<DetailJob> = this.jobPostService.getJobPost(
    this.authService.uid
  );

  news = new Array(10).fill(null);

  constructor(
    private jobPostService: JobPostService,
    private authService: AuthService
  ) {}

  ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { DetailJob } from 'src/app/interfaces/article';
import { JobPostService } from 'src/app/service/job-post.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  article$: Observable<DetailJob> = this.jobPostService.getJobPost(
    this.authService.uid
  );

  constructor(
    private jobPostService: JobPostService,
    private authService: AuthService
  ) {}

  ngOnInit() {}
}

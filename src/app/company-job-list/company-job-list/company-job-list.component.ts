import { Component, OnInit } from '@angular/core';
import { JobPostService } from 'src/app/services/job-post.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { DetailJob } from 'src/app/interfaces/article';

@Component({
  selector: 'app-company-job-list',
  templateUrl: './company-job-list.component.html',
  styleUrls: ['./company-job-list.component.scss']
})
export class CompanyJobListComponent implements OnInit {
  jobs$: Observable<DetailJob[]> = this.jobPostService.getMyCompanyJobList(
    this.authService.uid
  );

  constructor(
    private jobPostService: JobPostService,
    private authService: AuthService
  ) {}

  ngOnInit() {}
}

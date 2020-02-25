import { Component, OnInit } from '@angular/core';
import { DetailJob } from 'src/app/interfaces/article';
import { Observable } from 'rxjs';
import { JobPostService } from 'src/app/service/job-post.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  id: string;
  jobs$: Observable<DetailJob[]> = this.jobPostService.getNewJobs();

  constructor(private jobPostService: JobPostService) {}

  ngOnInit() {}
}

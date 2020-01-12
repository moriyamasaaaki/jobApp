import { Component, OnInit } from '@angular/core';
import { DetailJob } from 'src/app/interfaces/article';
import { JobPostService } from 'src/app/service/job-post.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id: string;
  article$: Observable<DetailJob>;
  constructor(
    private jobPostService: JobPostService,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe(params => {
      this.article$ = this.jobPostService.getJobPost(params.get('id'));
    });
  }

  ngOnInit() {}
}

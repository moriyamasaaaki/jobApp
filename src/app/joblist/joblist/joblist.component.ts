import { Component, OnInit } from '@angular/core';
import { DetailJob } from 'src/app/interfaces/article';
import { Observable } from 'rxjs';
import { JobPostService } from 'src/app/service/job-post.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.scss']
})
export class JoblistComponent implements OnInit {
  jobs$: Observable<DetailJob[]> = this.jobPostService.getAllJob();

  constructor(
    private jobPostService: JobPostService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  // addFavorite() {
  //   this.route.paramMap.subscribe(params => {
  //     this.jobPostService.likedItem(
  //       params.get('id'),
  //       this.authService.uid);
  //   });
  // }

  ngOnInit() {}
}

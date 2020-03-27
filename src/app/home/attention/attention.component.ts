import { Component, OnInit } from '@angular/core';
import { DetailJob } from 'src/app/interfaces/article';
import { Observable } from 'rxjs';
import { JobPostService } from 'src/app/services/job-post.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-attention',
  templateUrl: './attention.component.html',
  styleUrls: ['./attention.component.scss']
})
export class AttentionComponent implements OnInit {
  config: SwiperConfigInterface = {
    loop: true,
    navigation: true,
    pagination: true,
    centeredSlides: true,
    speed: 500,
    slidesPerView: 4
  };
  selectedJobId = 0;
  jobs$: Observable<DetailJob[]> = this.jobPostService.getAttentionJobs();

  constructor(private jobPostService: JobPostService) {}

  ngOnInit() {}
}

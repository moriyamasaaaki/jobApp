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
    speed: 600,
    autoplay: {
      delay: 4000,
      disableOnInteraction: true
    },
    breakpoints: {
      5000: {
        slidesPerView: 4
      },
      1439: {
        slidesPerView: 3
      },
      1023: {
        slidesPerView: 2
      },
      767: {
        slidesPerView: 1
      }
    }
  };
  selectedJobId = 0;
  jobs$: Observable<DetailJob[]> = this.jobPostService.getAttentionJobs();

  constructor(private jobPostService: JobPostService) {}

  ngOnInit() {}
}

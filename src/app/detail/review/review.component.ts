import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/service/review.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Review } from 'src/app/interfaces/review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  review$: Observable<Review> = this.reviewService.getReview(
    this.authService.uid
  );
  constructor(
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ReviewService } from 'src/app/service/review.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {
  form = this.fb.group({
    atmosphere: [''],
    contentDiff: [''],
    sift: [''],
    overtime: ['']
  });

  get atmosphereControl() {
    return this.form.get('atmosphere') as FormControl;
  }
  get contentDiffControl() {
    return this.form.get('contentDiff') as FormControl;
  }
  get siftControl() {
    return this.form.get('sift') as FormControl;
  }
  get overtimeControl() {
    return this.form.get('overtime') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  submit() {
    console.log(this.form.value);
    this.reviewService.createReview({
      userId: this.authService.uid,
      ...this.form.value
    });
  }
}

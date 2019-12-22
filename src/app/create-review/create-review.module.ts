import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateReviewRoutingModule } from './create-review-routing.module';
import { CreateReviewComponent } from './create-review/create-review.component';

@NgModule({
  declarations: [CreateReviewComponent],
  imports: [CommonModule, CreateReviewRoutingModule]
})
export class CreateReviewModule {}

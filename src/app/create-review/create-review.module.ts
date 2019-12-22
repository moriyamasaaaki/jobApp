import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateReviewRoutingModule } from './create-review-routing.module';
import { CreateReviewComponent } from './create-review/create-review.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [CreateReviewComponent],
  imports: [
    CommonModule,
    CreateReviewRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CreateReviewModule {}

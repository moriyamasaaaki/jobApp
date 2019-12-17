import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail/detail.component';

import {MatButtonModule} from '@angular/material/button';
import { ReviewComponent } from './review/review.component';
import {MatSliderModule} from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
  declarations: [DetailComponent, ReviewComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
    MatButtonModule,
    MatSliderModule,
    MatFormFieldModule
  ]
})
export class DetailModule { }

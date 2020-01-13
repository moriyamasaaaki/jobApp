import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail/detail.component';

import { MatButtonModule } from '@angular/material/button';
import { ReviewComponent } from './review/review.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SafePipeModule } from 'safe-pipe';
@NgModule({
  declarations: [DetailComponent, ReviewComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressBarModule,
    SafePipeModule
  ]
})
export class DetailModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail/detail.component';

import { MatButtonModule } from '@angular/material/button';
import { ReviewComponent } from './review/review.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { SafePipeModule } from 'safe-pipe';
@NgModule({
  declarations: [DetailComponent, ReviewComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressBarModule,
    SafePipeModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class DetailModule {}

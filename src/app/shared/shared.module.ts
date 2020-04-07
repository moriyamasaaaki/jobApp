import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { JobCardComponent } from './job-card/job-card.component';

@NgModule({
  declarations: [JobCardComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [JobCardComponent]
})
export class SharedModule {}

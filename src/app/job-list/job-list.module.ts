import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoblistRoutingModule } from './job-list-routing.module';
import { JoblistComponent } from './job-list/job-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [JoblistComponent],
  imports: [CommonModule, JoblistRoutingModule, SharedModule]
})
export class JoblistModule {}

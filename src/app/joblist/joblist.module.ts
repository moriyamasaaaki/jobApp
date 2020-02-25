import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoblistRoutingModule } from './joblist-routing.module';
import { JoblistComponent } from './joblist/joblist.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [JoblistComponent],
  imports: [CommonModule, JoblistRoutingModule, MatButtonModule, MatIconModule]
})
export class JoblistModule {}

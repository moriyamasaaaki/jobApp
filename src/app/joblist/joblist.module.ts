import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoblistRoutingModule } from './joblist-routing.module';
import { JoblistComponent } from './joblist/joblist.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [JoblistComponent],
  imports: [
    CommonModule,
    JoblistRoutingModule,
    MatButtonModule
  ]
})
export class JoblistModule { }

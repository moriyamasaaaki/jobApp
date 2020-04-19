import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { JobCardComponent } from './job-card/job-card.component';
import { TermsTextComponent } from './terms-text/terms-text.component';

@NgModule({
  declarations: [JobCardComponent, TermsTextComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [JobCardComponent, TermsTextComponent]
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyJobListRoutingModule } from './company-job-list-routing.module';
import { CompanyJobListComponent } from './company-job-list/company-job-list.component';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CompanyJobListComponent],
  imports: [CommonModule, CompanyJobListRoutingModule, MatButtonModule]
})
export class CompanyJobListModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyJobListRoutingModule } from './company-job-list-routing.module';
import { CompanyJobListComponent } from './company-job-list/company-job-list.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CompanyJobListComponent],
  imports: [CommonModule, CompanyJobListRoutingModule, SharedModule]
})
export class CompanyJobListModule {}

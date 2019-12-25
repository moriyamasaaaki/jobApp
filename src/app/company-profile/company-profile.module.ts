import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyProfileRoutingModule } from './company-profile-routing.module';
import { CompanyProfileComponent } from './company-profile/company-profile.component';

@NgModule({
  declarations: [CompanyProfileComponent],
  imports: [CommonModule, CompanyProfileRoutingModule]
})
export class CompanyProfileModule {}

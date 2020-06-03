import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyProfileRoutingModule } from './company-profile-routing.module';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [CompanyProfileComponent],
  imports: [
    CommonModule,
    CompanyProfileRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class CompanyProfileModule {}

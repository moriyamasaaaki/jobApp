import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanySideRoutingModule } from './company-side-routing.module';
import { RegisterFormComponent } from './register-form/register-form.component';


@NgModule({
  declarations: [RegisterFormComponent],
  imports: [
    CommonModule,
    CompanySideRoutingModule
  ]
})
export class CompanySideModule { }

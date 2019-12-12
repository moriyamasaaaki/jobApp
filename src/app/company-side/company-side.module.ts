import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanySideRoutingModule } from './company-side-routing.module';
import { RegisterFormComponent } from './register-form/register-form.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [RegisterFormComponent],
  imports: [
    CommonModule,
    CompanySideRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ]
})
export class CompanySideModule {}

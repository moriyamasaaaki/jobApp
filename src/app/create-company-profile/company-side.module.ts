import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanySideRoutingModule } from './company-side-routing.module';
import { RegisterFormComponent } from './register-form/register-form.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RegisterFormComponent],
  imports: [
    CommonModule,
    CompanySideRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    SharedModule
  ]
})
export class CompanySideModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeepRoutingModule } from './keep-routing.module';
import { KeepComponent } from './keep/keep.component';

import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [KeepComponent],
  imports: [
    CommonModule,
    KeepRoutingModule,
    MatButtonModule
  ]
})
export class KeepModule { }

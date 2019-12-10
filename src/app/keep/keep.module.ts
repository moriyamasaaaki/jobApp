import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeepRoutingModule } from './keep-routing.module';
import { KeepComponent } from './keep/keep.component';


@NgModule({
  declarations: [KeepComponent],
  imports: [
    CommonModule,
    KeepRoutingModule
  ]
})
export class KeepModule { }

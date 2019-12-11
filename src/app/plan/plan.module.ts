import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import { PlanComponent } from './plan/plan.component';

import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [PlanComponent],
  imports: [
    CommonModule,
    PlanRoutingModule,
    MatButtonModule
  ]
})
export class PlanModule { }

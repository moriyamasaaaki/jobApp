import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import { PlanComponent } from './plan/plan.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [PlanComponent],
  imports: [CommonModule, PlanRoutingModule, MatButtonModule, MatDialogModule]
})
export class PlanModule {}

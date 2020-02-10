import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, AboutRoutingModule, MatTabsModule, MatStepperModule]
})
export class AboutModule {}

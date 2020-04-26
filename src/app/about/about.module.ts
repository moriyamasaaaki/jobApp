import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, AboutRoutingModule, MatButtonModule, MatCardModule]
})
export class AboutModule {}

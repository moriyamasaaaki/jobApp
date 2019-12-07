import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopRoutingModule } from './top-routing.module';
import { TopComponent } from './top/top.component';


@NgModule({
  declarations: [TopComponent],
  imports: [
    CommonModule,
    TopRoutingModule
  ]
})
export class TopModule { }

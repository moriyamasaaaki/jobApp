import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopRoutingModule } from './top-routing.module';
import { TopComponent } from './top/top.component';
import { AttentionComponent } from './attention/attention.component';

import { MatButtonModule } from '@angular/material/button';
import { NewComponent } from './new/new.component';


@NgModule({
  declarations: [TopComponent, AttentionComponent, NewComponent],
  imports: [
    CommonModule,
    TopRoutingModule,
    MatButtonModule,
  ]
})
export class TopModule { }

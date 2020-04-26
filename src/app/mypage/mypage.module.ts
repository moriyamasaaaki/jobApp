import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MypageRoutingModule } from './mypage-routing.module';
import { MypageComponent } from './mypage/mypage.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
  declarations: [MypageComponent],
  imports: [
    CommonModule,
    MypageRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule
  ]
})
export class MypageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MypageRoutingModule } from './mypage-routing.module';
import { MypageComponent } from './mypage/mypage.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [MypageComponent],
  imports: [CommonModule, MypageRoutingModule, MatButtonModule, MatDialogModule]
})
export class MypageModule {}

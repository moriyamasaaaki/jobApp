import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help/help.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HelpComponent],
  imports: [
    CommonModule,
    HelpRoutingModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class HelpModule {}

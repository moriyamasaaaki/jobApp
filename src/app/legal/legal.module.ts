import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalRoutingModule } from './legal-routing.module';
import { LegalComponent } from './legal/legal.component';
import { TermsComponent } from './terms/terms.component';


@NgModule({
  declarations: [LegalComponent, TermsComponent],
  imports: [
    CommonModule,
    LegalRoutingModule
  ]
})
export class LegalModule { }

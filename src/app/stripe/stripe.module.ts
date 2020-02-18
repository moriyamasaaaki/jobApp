import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StripeRoutingModule } from './stripe-routing.module';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [],
  imports: [CommonModule, StripeRoutingModule, NgxStripeModule]
})
export class StripeModule {}

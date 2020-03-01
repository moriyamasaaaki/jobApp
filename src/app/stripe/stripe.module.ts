import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StripeRoutingModule } from './stripe-routing.module';
import { NgxStripeModule } from 'ngx-stripe';
import { StripeComponent } from './stripe/stripe.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PaymentComponent } from './payment/payment.component';
@NgModule({
  declarations: [StripeComponent, PaymentComponent],
  imports: [
    CommonModule,
    StripeRoutingModule,
    NgxStripeModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule
  ]
})
export class StripeModule {}

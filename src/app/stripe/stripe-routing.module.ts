import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StripeComponent } from './stripe/stripe.component';

const routes: Routes = [
  {
    path: '',
    component: StripeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StripeRoutingModule {}

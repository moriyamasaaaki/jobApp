import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StripeComponent } from 'src/app/stripe/stripe/stripe.component';
import { SubscriptionComponent } from 'src/app/stripe/subscription/subscription.component';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  constructor(private matDialog: MatDialog) {}

  ngOnInit() {}

  subscription() {
    this.matDialog.open(SubscriptionComponent);
  }

  stripeDialog() {
    this.matDialog.open(StripeComponent);
  }
}

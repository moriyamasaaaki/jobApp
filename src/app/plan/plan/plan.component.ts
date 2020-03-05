import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StripeComponent } from 'src/app/stripe/stripe/stripe.component';
import { FeeService } from 'src/app/services/fee.service';
import { PaymentComponent } from 'src/app/stripe/payment/payment.component';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  text: boolean;
  subscriptionID: string;
  register: boolean;
  customerId: string;
  planID$ = this.feeService.getCustomer().subscribe((plan: any) => {
    this.subscriptionID = plan.subscriptionId;
    this.customerId = plan.customerId;
    if (this.customerId) {
      this.text = true;
    } else {
      this.text = false;
    }
  });

  constructor(private matDialog: MatDialog, private feeService: FeeService) {}

  ngOnInit() {}

  stripeDialog() {
    this.matDialog.open(StripeComponent);
  }

  creditDialog() {
    this.matDialog.open(PaymentComponent);
  }
}

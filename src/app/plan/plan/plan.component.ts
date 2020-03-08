import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StripeComponent } from 'src/app/stripe/stripe/stripe.component';
import { FeeService } from 'src/app/services/fee.service';
import { PaymentComponent } from 'src/app/stripe/payment/payment.component';
import { AuthService } from 'src/app/services/auth.service';

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
  cardName: string;
  amex: string;
  card$ = this.feeService.getCard(this.authServie.uid);
  planID$ = this.feeService.getCustomer().subscribe((plan: any) => {
    this.subscriptionID = plan.subscriptionId;
    this.customerId = plan.customerId;
    if (this.customerId) {
      this.text = true;
    } else {
      this.text = false;
    }
  });

  constructor(
    private matDialog: MatDialog,
    private feeService: FeeService,
    private authServie: AuthService
  ) {
    this.card$.subscribe(card => {
      this.cardName = card.card.brand.toLowerCase();
      if (this.cardName === 'american express') {
        const amexCard = this.cardName;
        const amexHead = amexCard.slice(0, 2);
        const amexFoot = amexCard.slice(9, 11);
        this.amex = amexHead + amexFoot;
        console.log(this.amex);
      } else {
        return this.cardName;
      }
    });
  }

  ngOnInit() {}

  stripeDialog() {
    this.matDialog.open(StripeComponent);
  }

  creditDialog() {
    this.matDialog.open(PaymentComponent);
  }
}

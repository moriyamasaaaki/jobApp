import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StripeComponent } from 'src/app/stripe/stripe/stripe.component';
import { FeeService } from 'src/app/services/fee.service';
import { PaymentComponent } from 'src/app/stripe/payment/payment.component';
import { AuthService } from 'src/app/services/auth.service';
import { firestore } from 'firebase';
import { WindowService } from 'src/app/services/window.service';
import { ProfileDialogComponent } from 'src/app/profile-dialog/profile-dialog.component';

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
  startedAt: firestore.Timestamp;
  card$ = this.feeService.getCard(this.authServie.uid);
  planID$ = this.feeService.getCustomer().subscribe((plan: any) => {
    this.subscriptionID = plan.subscriptionId;
    this.customerId = plan.customerId;
    this.startedAt = plan.startedAt;
    if (this.customerId) {
      this.text = true;
    } else {
      this.text = false;
    }
  });

  constructor(
    private matDialog: MatDialog,
    private feeService: FeeService,
    private authServie: AuthService,
    private dialog: MatDialog,
    private authService: AuthService,
    private windowService: WindowService
  ) {}

  ngOnInit() {
    this.windowService.handleResizeWindow(window.innerWidth);
  }
  stripeDialog() {
    this.matDialog.open(StripeComponent);
  }

  creditDialog() {
    this.matDialog.open(PaymentComponent);
  }

  openDeleteDialog() {
    this.dialog
      .open(ProfileDialogComponent, {
        data: {
          title: '退会しますか？？',
          content:
            '退会すると全てのデータが削除され、復元することはできません。',
          btnText: '退会する'
        }
      })
      .afterClosed()
      .subscribe(status => {
        if (status) {
          this.authService.withdrawUser();
        }
      });
  }
}

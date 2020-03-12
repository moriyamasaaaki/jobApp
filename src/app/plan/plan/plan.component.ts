import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StripeComponent } from 'src/app/stripe/stripe/stripe.component';
import { FeeService } from 'src/app/services/fee.service';
import { PaymentComponent } from 'src/app/stripe/payment/payment.component';
import { AuthService } from 'src/app/services/auth.service';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyProfileService } from 'src/app/services/company-profile.service';

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
    private authServie: AuthService,
    private dialog: MatDialog,
    private authService: AuthService,
    private userProfileService: UserProfileService,
    private companyProfileSurvice: CompanyProfileService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {}

  stripeDialog() {
    this.matDialog.open(StripeComponent);
  }

  creditDialog() {
    this.matDialog.open(PaymentComponent);
  }

  openDeleteDialog() {
    this.dialog
      .open(DeleteDialogComponent)
      .afterClosed()
      .subscribe(status => {
        if (status) {
          console.log(this.authService.uid);
          this.userProfileService.deleteProfile(this.authService.uid);
          this.companyProfileSurvice.deleteCompanyUser(this.authService.uid);
        }
        this.snackbar.open('ご利用ありがとうございました。', null, {
          duration: 3000
        });
      });
  }
}

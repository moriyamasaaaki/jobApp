import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import {
  StripeCardComponent,
  ElementOptions,
  ElementsOptions,
  StripeService
} from 'ngx-stripe';
import { FeeService } from 'src/app/services/fee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  tokenID: string;

  @ViewChild(StripeCardComponent, { static: false }) card: StripeCardComponent;

  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: ElementsOptions = {
    locale: 'ja'
  };

  stripeTest: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private feeService: FeeService,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get nameControl() {
    return this.stripeTest.get('name') as FormControl;
  }

  get emailControl() {
    return this.stripeTest.get('email') as FormControl;
  }

  buy() {
    const name = this.stripeTest.get('name').value;
    const email = this.stripeTest.get('email').value;
    this.stripeService
      .createToken(this.card.getCard(), { name })
      .subscribe(result => {
        if (result.token) {
          const tokenId = result.token.id;
          this.tokenID = tokenId;
          this.feeService.setCard(this.authService.uid, result.token.card);
          this.feeService.createCustomer({
            source: tokenId,
            email,
            name
          });
          this.snackbar.open('クレジットカードを登録しました。', null, {
            duration: 3000
          });
        } else if (result.error) {
          this.snackbar.open('クレジットカードを登録に失敗しました。', null, {
            duration: 3000
          });
          console.log(result.error.message);
        }
      });
  }
}

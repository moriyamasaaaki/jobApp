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
@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss']
})
export class StripeComponent implements OnInit {
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
    private snackbar: MatSnackBar
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
          this.feeService.createCustomer({
            source: tokenId,
            email,
            description: ''
          });
          this.snackbar.open('クレジットカードを登録しました。', null, {
            duration: 3000
          });
          console.log(result.token.id);
          console.log(name);
          console.log(email);
        } else if (result.error) {
          console.log(result.error.message);
        }
      });
  }
}

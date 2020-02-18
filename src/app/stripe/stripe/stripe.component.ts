import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  StripeCardComponent,
  ElementOptions,
  ElementsOptions,
  StripeService
} from 'ngx-stripe';
import { FeeService } from 'src/app/services/fee.service';
// import { StripeService } from '../../services/stripe.service';

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
    locale: 'es'
  };

  stripeTest: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private feeService: FeeService
  ) {}

  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  buy() {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.getCard(), { name })
      .subscribe(result => {
        if (result.token) {
          const tokenId = result.token.id;
          this.feeService.createCustomer({
            source: tokenId,
            email: 'm.masa6262@gmail.com', // 決済にまつわる通知をするために必要
            description: ''
          });
          console.log(result.token.id);
        } else if (result.error) {
          console.log(result.error.message);
        }
      });
  }
}

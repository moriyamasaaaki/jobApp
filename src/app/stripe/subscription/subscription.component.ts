import { Component, OnInit } from '@angular/core';
import { FeeService } from 'src/app/services/fee.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  constructor(private feeService: FeeService) {}

  ngOnInit() {}

  buySubscribe() {
    this.feeService.createSubscribe();
  }
}

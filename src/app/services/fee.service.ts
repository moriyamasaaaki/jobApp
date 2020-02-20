import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class FeeService {
  constructor(private fns: AngularFireFunctions) {}

  createCustomer(params: {
    source: string;
    email: string;
    description: string;
  }): Promise<void> {
    const callable = this.fns.httpsCallable('createCustomer');
    this.fns.httpsCallable('registerForBilling');
    return callable(params).toPromise();
  }

  //サブスク開始
  createSubscribe() {
    this.fns.httpsCallable('registerForBilling');
  }
}

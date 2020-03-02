import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class FeeService {
  constructor(
    private fns: AngularFireFunctions,
    private db: AngularFirestore,
    private authService: AuthService
  ) {}

  // 顧客作成
  createCustomer(params: {
    source: string;
    email: string;
    name: string;
  }): Promise<void> {
    console.log(params);
    const callable = this.fns.httpsCallable('createCustomer');
    return callable(params).toPromise();
  }

  // サブスク開始
  startSubscription(data: {
    userId: string;
    customerId: string;
    planId: string;
  }): Promise<void> {
    console.log(data);
    const callable = this.fns.httpsCallable('registerForBilling');
    return callable(data).toPromise();
  }

  // サブスク停止
  stopSubscription(data: { userId: string; planId: string }): Promise<void> {
    console.log(data);
    const callable = this.fns.httpsCallable('withdrawForBilling');
    return callable(data).toPromise();
  }

  deleteCustomer(customerId: string) {
    const callable = this.fns.httpsCallable('deleteCustomer');
    return callable({ customerId }).toPromise();
  }

  // 顧客ID取得
  getCustomer() {
    return this.db.doc(`customers/${this.authService.uid}`).valueChanges();
  }
}

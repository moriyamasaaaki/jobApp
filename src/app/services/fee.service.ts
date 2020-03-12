import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Card } from '../interfaces/card';
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

  // カード情報
  setCard(userId: string, card: any): Promise<void> {
    const { address_zip, exp_month, exp_year, last4, brand, id } = card;
    return this.db.doc<Card>(`customers/${userId}/private/payment`).set(
      {
        card: { address_zip, exp_month, exp_year, last4, brand, id }
      },
      { merge: true }
    );
  }

  getCard(userId: string) {
    return this.db
      .doc<Card>(`customers/${userId}/private/payment`)
      .valueChanges();
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

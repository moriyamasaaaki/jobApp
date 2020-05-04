import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const stripe = require('stripe')(functions.config().stripe.key);
const db = admin.firestore();

const taxId = functions.config().stripe.tax_id;
const planId = functions.config().stripe.plan_id;

// ---------------------顧客作成関数----------------------------------
export const createCustomer = functions
  .region('asia-northeast1')
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        '権限がありません'
      );
    }

    const customer = await stripe.customers.create(data);
    console.log(customer);
    // Firestoreの顧客コレクションに顧客IDを記録
    return db.doc(`customers/${context.auth.uid}`).set({
      userId: context.auth.uid,
      email: customer.email,
      customerId: customer.id,
      subscriptionId: ''
    });
  });

//----------------------課金を開始する関数------------------------------
export const registerForBilling = functions
  .region('asia-northeast1')
  .https.onCall(
    async (
      data: {
        userId: string;
        customerId: string; // 課金するカスタマーのID
        planId: string; // 登録するプランのID
        subscriptionId?: string;
      },
      context: any
    ) => {
      if (!context.auth) {
        throw new Error('認証エラー');
      }
      // 課金を開始し、課金情報を取得
      const subscription = await stripe.subscriptions.create({
        customer: data.customerId,
        default_tax_rates: [taxId],
        items: [{ plan: planId }]
      });
      console.log(subscription);
      // ユーザーに課金IDを保持させる
      await db.doc(`customers/${context.auth.uid}`).update({
        planId,
        subscriptionId: subscription.id,
        startedAt: new Date()
      });
    }
  );

//---------------課金停止処理--------------------

export const withdrawForBilling = functions
  .region('asia-northeast1')
  .https.onCall(
    async (
      data: {
        userId: string;
        customerId: string;
        planId: string;
        subscriptionId: string;
      },
      context
    ) => {
      if (!context.auth) {
        throw new Error('認証エラー');
      }

      const userPayment = (
        await db.doc(`customers/${context.auth.uid}`).get()
      ).data();

      if (!userPayment) {
        return;
      }

      await stripe.subscriptions.del(userPayment.subscriptionId);
      await db.doc(`customers/${context.auth.uid}`).update({
        subscriptionId: null,
        planId: 'free'
      });
    }
  );

// ----------------------ユーザー削除時の処理-------------------------

export const deleteCustomer = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async user => {
    // コレクションから顧客を取得
    const customer: any = (await db.doc(`customers/${user.uid}`).get()).data();
    // 顧客IDを使って顧客を削除
    stripe.customers.del(customer.customerId);
    return db.doc(`customers/${user.uid}`).delete();
  });

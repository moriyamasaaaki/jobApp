import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const stripe = require('stripe')(functions.config().stripe.key);
const db = admin.firestore();
console.log(stripe);
// 顧客作成関数
export const createCustomer = functions.https.onCall(async (data, context) => {
  // エラーハンドリング
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'permission-denied',
      '権限がありません'
    );
  }

  // Stripeに作成した顧客情報を受け取る
  const customer = await stripe.customers.create(data);
  console.log(customer);
  // Firestoreの顧客コレクションに顧客IDを記録
  return db.doc(`customers/${context.auth.uid}`).set({
    userId: context.auth.uid,
    customerId: customer.id // 顧客のID
  });
});

//----------------------------------------------------
// 環境変数から税率IDを取得
const taxId = functions.config().stripe.tax_id;
const planId = functions.config().stripe.plan_id;

// 課金を開始する関数
export const registerForBilling = functions.https.onCall(
  async (
    data: {
      customerId: string; // 課金するカスタマーのID
      planId: string; // 登録するプランのID
    },
    context
  ) => {
    // 例外処理
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
    return db.doc(`customers/${context.auth.uid}`).update({
      subscriptionId: subscription.items.plan
    });
  }
);

//---------------------------------------------------

//-------課金停止処理

export const withdrawForBilling = functions.https.onCall(
  async (
    data: {
      customerId: string; //課金停止するカスタマーのID
      planId: string; //課金停止するプランのID
    },
    context
  ) => {
    // 例外処理
    if (!context.auth) {
      throw new Error('認証エラー');
    }
    const subscription = await stripe.subscriptions.del({
      customer: data.customerId,
      default_tax_rates: [taxId],
      items: [{ plan: data.planId }]
    });
    return db.doc(`users/${context.auth.uid}`).update({
      subscriptionId: subscription.id
    });
  }
);

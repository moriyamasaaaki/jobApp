import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const stripe = require('stripe')(functions.config().stripe.key);
const db = admin.firestore();

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

  // Firestoreの顧客コレクションに顧客IDを記録
  return db.doc(`customers/${context.auth.uid}`).set({
    uid: context.auth.uid,
    customerId: customer.id // 顧客のID
  });
});

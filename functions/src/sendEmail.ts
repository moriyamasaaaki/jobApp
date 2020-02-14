import * as functions from 'firebase-functions';
// import { markEventTried, shouldEventRun } from './utility.function';
import * as admin from 'firebase-admin';
import * as sgMail from '@sendgrid/mail';

const db = admin.firestore();

// 環境変数からキーを取得
const API_KEY = functions.config().sendgrid.key;

// メールクライアント初期化
sgMail.setApiKey(API_KEY);
console.log(API_KEY);

export const userSendEmail = functions.firestore
  .document('userProfile/{userId}')
  .onCreate(async (snap, context) => {
    const userId = context.params.userId;

    return db
      .doc(`userProfile/${userId}`)
      .get()
      .then(doc => {
        const user: any = doc.data();

        console.log(user);
        const msg = {
          to: user.email,
          from: {
            email: 'moriya-7071@outlook.com',
            name: 'Tokyo bite'
          },
          templateId: 'd-fcbcd1da133d49a29f1f1602fc1972c2',
          dynamicTemplateData: {
            name: user.name
          }
        };
        console.log(sgMail);
        console.log(msg);
        return sgMail.send(msg);
      })
      .then(() => console.log('email sent!'))
      .catch(err => console.log(err));
  });

import * as functions from 'firebase-functions';
import { shouldEventRun } from './utility.function';
import * as admin from 'firebase-admin';
import * as sgMail from '@sendgrid/mail';

const db = admin.firestore();

// 環境変数からキーを取得
const API_KEY = functions.config().sendgrid.key;

// メールクライアント初期化
sgMail.setApiKey(API_KEY);
console.log(API_KEY);

export const widhdrawUserSendEmail = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async (snap, context) => {
    await db
      .doc(`userProfile/${snap.uid}`)
      .get()
      .then(doc => {
        const eventId = context.eventId;
        return shouldEventRun(eventId)
          .then((should: boolean) => {
            if (should) {
              const user: any = doc.data();
              console.log(user);
              const msg = {
                to: user.email,
                from: {
                  email: 'moriya-7071@outlook.com',
                  name: 'Proxy Works'
                },
                templateId: 'd-44b433a5295c4708a96ab4c39116ea5e',
                dynamicTemplateData: {
                  name: user.name
                }
              };
              console.log(sgMail);
              console.log(msg);
              return sgMail.send(msg);
            } else {
              return;
            }
          })
          .catch(err => console.log(err));
      });
  });

export const widhdrawCompanySendEmail = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async (snap, context) => {
    await db
      .doc(`companyProfile/${snap.uid}`)
      .get()
      .then(doc => {
        const eventId = context.eventId;
        return shouldEventRun(eventId)
          .then((should: boolean) => {
            if (should) {
              const company: any = doc.data();
              console.log(company);
              const msg = {
                to: company.email,
                from: {
                  email: 'moriya-7071@outlook.com',
                  name: 'Proxy Works'
                },
                templateId: 'd-5c9ad11acc93460aaf6f44d72b1a3b2e',
                dynamicTemplateData: {
                  name: company.name,
                  lastName: company.lastName,
                  firstName: company.firstName
                }
              };
              console.log(sgMail);
              console.log(msg);
              return sgMail.send(msg);
            } else {
              return;
            }
          })
          .catch(err => console.log(err));
      });
  });

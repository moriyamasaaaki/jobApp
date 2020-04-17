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

// 応募フォーム //
export const recuitSendEmail = functions.firestore
  .document('JobPosts/{id}/recuit/{userId}')
  .onCreate(async (snap, context) => {
    const userId = context.params.userId;
    const id = context.params.id;
    return db
      .doc(`JobPosts/${id}/recuit/${userId}`)
      .get()
      .then(doc => {
        const eventId = context.eventId;
        return shouldEventRun(eventId)
          .then((should: boolean) => {
            if (should) {
              const recuitDate: any = doc.data();
              console.log(recuitDate);
              const msg = {
                to: recuitDate.companyEmail,
                from: {
                  email: 'moriya-7071@outlook.com',
                  name: 'Proxy Works'
                },
                templateId: 'd-fec48e26c33549f79a6a5ae934f38dfe',
                dynamicTemplateData: {
                  companyName: recuitDate.companyName,
                  companyTitle: recuitDate.companyTitle,
                  name: recuitDate.name,
                  year: recuitDate.bday.year,
                  month: recuitDate.bday.month,
                  day: recuitDate.bday.day,
                  gender: recuitDate.gender,
                  tel: recuitDate.tel,
                  email: recuitDate.email
                }
              };
              console.log(sgMail);
              console.log(msg);
              return sgMail.send(msg);
            } else {
              return;
            }
          })
          .then(() => console.log('企業様に求人応募のメールを送信しました!'))
          .catch(err => console.log(err));
      });
  });

// 応募完了メール //
export const recuitCompletionEmail = functions.firestore
  .document('JobPosts/{id}/recuit/{userId}')
  .onCreate(async (snap, context) => {
    const userId = context.params.userId;
    const id = context.params.id;
    return db
      .doc(`JobPosts/${id}/recuit/${userId}`)
      .get()
      .then(doc => {
        const eventId = context.eventId;
        return shouldEventRun(eventId)
          .then((should: boolean) => {
            if (should) {
              const completeDate: any = doc.data();
              console.log(completeDate);
              const msg = {
                to: completeDate.email,
                from: {
                  email: 'moriya-7071@outlook.com',
                  name: 'Proxy Works'
                },
                templateId: 'd-1571473911944574b27173f8ef7d14de',
                dynamicTemplateData: {
                  companyTitle: completeDate.companyTitle,
                  name: completeDate.name,
                  year: completeDate.bday.year,
                  month: completeDate.bday.month,
                  day: completeDate.bday.day,
                  gender: completeDate.gender,
                  tel: completeDate.tel,
                  email: completeDate.email
                }
              };
              console.log(sgMail);
              console.log(msg);
              return sgMail.send(msg);
            } else {
              return;
            }
          })
          .then(() => console.log('応募ありがとうございます！'))
          .catch(err => console.log(err));
      });
  });

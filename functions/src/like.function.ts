import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

import { markEventTried, shouldEventRun } from './utility.function';

const db = admin.firestore();

export const countUpLiked = functions
  .region('asia-northeast1')
  .firestore.document('likes/{id}/likedUsers/{userId}')
  .onCreate(async (snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async (should: boolean) => {
      if (should) {
        console.log(should);
        await db
          .doc(`JobPosts/${context.params.id}`)
          .update('likedCount', admin.firestore.FieldValue.increment(1));
        return markEventTried(eventId);
      } else {
        return;
      }
    });
  });

export const countDownLiked = functions
  .region('asia-northeast1')
  .firestore.document('likes/{id}/likedUsers/{userId}')
  .onDelete(async (snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async (should: boolean) => {
      if (should) {
        await db
          .doc(`JobPosts/${context.params.id}`)
          .update('likedCount', admin.firestore.FieldValue.increment(-1));
        return markEventTried(eventId);
      } else {
        return;
      }
    });
  });

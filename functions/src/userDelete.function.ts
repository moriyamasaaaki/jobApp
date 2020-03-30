import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

const db = admin.firestore();

export const deleteUserJobs = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async user => {
    const jobs = await db
      .collection('JobPosts')
      .where('jobId', '==', user.uid)
      .get();
    const batch = db.batch();

    jobs.forEach((job: DocumentSnapshot) => {
      batch.delete(job.ref);
    });

    await batch.commit();
  });

export const deleteUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async user => {
    await db.doc(`userProfile/${user.uid}`).delete();
  });

export const deleteCompany = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async user => {
    await db.doc(`companyProfile/${user.uid}`).delete();
  });

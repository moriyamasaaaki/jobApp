import * as functions from 'firebase-functions';
import { addIndex, updateIndex, removeIndex } from './algolia';

export const createArticle = functions.firestore
  .document('JobPosts/{id}')
  .onCreate(async (snap, context) => {
    return addIndex(snap.data());
  });

// 更新フック
export const updateLessonMeta = functions.firestore
  .document('JobPosts/{id}')
  .onUpdate(async (change, context) => {
    const newData = change.after.data();

    if (!newData) {
      throw new Error('データが存在しません');
    }
    return updateIndex(newData);
  });

// 削除フック
export const deleteArticle = functions.firestore
  .document('JobPosts/{id}')
  .onDelete(async (snapshot, context) => {
    return removeIndex(context.params.id);
  });

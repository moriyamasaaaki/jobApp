import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DetailJob, Favorite } from '../interfaces/article';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserProfile } from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class LikedService {
  constructor(private db: AngularFirestore) {}

  // いいね追加
  likedPost(id: string, userId: string): Promise<void> {
    return this.db.doc(`LikedUsers/${userId}/LikedItems/${id}`).set({ id });
  }

  // いいねした人のユーザーID
  getLikedUser(id: string, userId: string): Promise<void> {
    return this.db.doc(`likes/${id}/likedUsers/${userId}`).set({ userId });
  }

  // いいねしたユーザーリスト一覧
  getLikedUserList(id: string) {
    return this.db
      .collection<Favorite>(`likes/${id}/likedUsers`)
      .valueChanges()
      .pipe(
        switchMap(docs => {
          return combineLatest(
            docs.map(doc =>
              this.db
                .doc<UserProfile>(`userProfile/${doc.userId}`)
                .valueChanges()
            )
          );
        })
      );
  }

  // いいね一覧取得
  getLikedJobs(userId: string) {
    return this.db
      .collection<Favorite>(`LikedUsers/${userId}/LikedItems`)
      .valueChanges()
      .pipe(
        switchMap(docs => {
          return combineLatest(
            docs.map(doc =>
              this.db.doc<DetailJob>(`JobPosts/${doc.id}`).valueChanges()
            )
          );
        })
      );
  }

  // いいねを削除
  deleteLiked(userId: string, id: string): Promise<void> {
    return this.db.doc(`LikedUsers/${userId}/LikedItems/${id}`).delete();
  }

  // いいねしたユーザー削除
  deleteLikedUser(id: string, userId: string): Promise<void> {
    return this.db.doc(`likes/${id}/likedUsers/${userId}`).delete();
  }

  // いいねしているかのチェック
  checkIsLiked(id: string, userId: string): Observable<boolean> {
    return this.db
      .doc(`likes/${id}/likedUsers/${userId}`)
      .valueChanges()
      .pipe(map(doc => !!doc));
  }
}

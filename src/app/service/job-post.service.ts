import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DetailJob, Favorite, JobWidhFavorite } from '../interfaces/article';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  updateJob(article: DetailJob, id: string, images?: File[]): Promise<void> {
    return this.db
      .doc(`JobPosts/${id}`)
      .update({ id, ...article, updatedAt: new Date() })
      .then(() => {
        this.snackBar.open('求人を更新しました', null, {
          duration: 2000
        });
        if (images) {
          this.uploadImages(images, id);
        }
        this.router.navigateByUrl(`/detail/${id}`);
      });
  }

  //一枚の画像アップロード
  uploadImage(file: File, id: string): Promise<void> {
    return this.storage.upload(`jobPosts/${id}`, file).then(result => {
      this.db.doc(`JobPosts/${id}`).update({
        photoURL: result.ref.getDownloadURL()
      });
    });
  }

  //複数枚画像アップロード
  uploadImages(files: File[], id: string): Promise<void> {
    return Promise.all(
      files.map((file, index) => {
        const ref = this.storage.ref(`JobPosts/${id}-${index}`);
        return ref.put(file);
      })
    ).then(async tasks => {
      const jobImageUrls = [];
      for (const task of tasks) {
        jobImageUrls.push(await task.ref.getDownloadURL());
      }
      return this.db.doc(`JobPosts/${id}`).update({
        jobImageUrls
      });
    });
  }

  //求人作成
  createJobPost(jobId: string, article: DetailJob, images?: File[]) {
    const id = this.db.createId();
    return this.db
      .doc(`JobPosts/${id}`)
      .set({ id, ...article, createdAt: new Date() })
      .then(() => {
        this.snackBar.open('求人を作成しました', null, {
          duration: 2000
        });
        if (images) {
          this.uploadImages(images, id);
        }
        this.router.navigateByUrl(`/detail/${id}`);
      });
  }

  getJobPost(id: string): Observable<DetailJob> {
    return this.db.doc<DetailJob>(`JobPosts/${id}`).valueChanges();
  }

  //新着投稿取得
  getNewJobs(): Observable<DetailJob[]> {
    return this.db
      .collection<DetailJob>('JobPosts', ref => {
        return ref.orderBy('createdAt').limit(10);
      })
      .valueChanges();
  }

  //注目投稿取得
  getAttentionJobs(): Observable<DetailJob[]> {
    return this.db
      .collection<DetailJob>('JobPosts', ref => {
        return ref.orderBy('likedCount').limit(9);
      })
      .valueChanges();
  }

  //求人一覧取得
  getAllJob(): Observable<DetailJob[]> {
    return this.db
      .collection<DetailJob>('JobPosts', ref => {
        return ref.orderBy('createdAt').limit(30);
      })
      .valueChanges();
  }

  //求人削除
  deleteJob(id: string): Promise<void> {
    return this.db
      .doc(`JobPosts/${id}`)
      .delete()
      .then(() => {
        this.snackBar.open('求人を削除しました。', null, {
          duration: 3000
        });
      });
  }
  // --------------------------------
  //いいね追加
  likedItem(id: string, userId: string): Promise<void> {
    return this.db.doc(`LikedUsers/${userId}/LikedItems/${id}`).set({ id });
  }

  //いいねした人のユーザーID
  likedUser(id: string, userId: string): Promise<void> {
    return this.db.doc(`likes/${id}/likedUsers/${userId}`).set({ userId });
  }

  //いいね一覧取得
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

  //いいねを削除
  deleteLikedJobs(userId: string, id: string): Promise<void> {
    return this.db.doc(`LikedUsers/${userId}/LikedItems/${id}`).delete();
  }

  //いいねそたユーザー削除
  deleteLikesUser(id: string, userId: string): Promise<void> {
    return this.db.doc(`likes/${id}/likedUsers/${userId}`).delete();
  }

  //いいねしているかのチェック
  isLiked(id: string, userId: string): Observable<boolean> {
    return this.db
      .doc(`likes/${id}/likedUsers/${userId}`)
      .valueChanges()
      .pipe(map(doc => !!doc));
  }
}

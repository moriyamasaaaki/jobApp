import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DetailJob } from '../interfaces/article';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

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
        this.router.navigateByUrl(`/job/detail/${id}`);
      })
      .catch(error => {
        this.snackBar.open(`${error},求人を更新できませんでした`, null, {
          duration: 3000
        });
      });
  }

  // 複数枚画像アップロード
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

  // 求人作成
  createJobPost(
    jobId: string,
    companyEmail: string,
    article: DetailJob,
    images?: File[]
  ) {
    const id = this.db.createId();
    return this.db
      .doc(`JobPosts/${id}`)
      .set({ id, jobId, companyEmail, ...article, createdAt: new Date() })
      .then(() => {
        this.snackBar.open('求人を作成しました', null, {
          duration: 3000
        });
        if (images) {
          this.uploadImages(images, id);
        }
        this.router.navigateByUrl(`/job/detail/${id}`);
      })
      .catch(error => {
        this.snackBar.open(`${error},求人を作成できませんでした`, null, {
          duration: 3000
        });
      });
  }

  getJobPost(id: string): Observable<DetailJob> {
    return this.db.doc<DetailJob>(`JobPosts/${id}`).valueChanges();
  }
  // 新着投稿取得
  getNewJobs(): Observable<DetailJob[]> {
    return this.db
      .collection<DetailJob>('JobPosts', ref => {
        return ref.orderBy('createdAt').limit(9);
      })
      .valueChanges();
  }

  // 注目投稿取得
  getAttentionJobs(): Observable<DetailJob[]> {
    return this.db
      .collection<DetailJob>('JobPosts', ref => {
        return ref.orderBy('likedCount').limit(6);
      })
      .valueChanges();
  }

  // 求人一覧取得
  getAllJobs(): Observable<DetailJob[]> {
    return this.db
      .collection<DetailJob>('JobPosts', ref => {
        return ref.orderBy('createdAt').limit(30);
      })
      .valueChanges();
  }

  // 求人削除
  deleteJob(id: string): Promise<void> {
    return this.db
      .doc(`JobPosts/${id}`)
      .delete()
      .then(() => {
        this.snackBar.open('求人を削除しました。', null, {
          duration: 3000
        });
      })
      .catch(error => {
        this.snackBar.open(`${error},求人を削除できませんでした。`, null, {
          duration: 3000
        });
      });
  }

  // 自社の投稿一覧表示
  getMyCompanyJobs(companyUserId: string): Observable<DetailJob[]> {
    return this.db
      .collection<DetailJob>(`JobPosts`, ref => {
        return ref.where('jobId', '==', companyUserId);
      })
      .valueChanges();
  }
}

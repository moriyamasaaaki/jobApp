import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DetailJob } from '../interfaces/article';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
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

  createJobPost(article: DetailJob, avatarImage?: File) {
    return this.db
      .doc(`JobPosts/${article.jobId}`)
      .set(article)
      .then(() => {
        this.snackBar.open('求人を作成しました', null, {
          duration: 2000
        });
        if (avatarImage) {
          this.updateAvatar(article.jobId, avatarImage);
        }
        this.router.navigateByUrl('/detail');
      });
  }
  getJobPost(jobId: string): Observable<DetailJob> {
    return this.db
      .collection<DetailJob>('JobPosts', ref => ref.where('jobId', '==', jobId))
      .valueChanges()
      .pipe(
        map(JobPosts => {
          if (JobPosts.length) {
            return JobPosts[0];
          } else {
            return null;
          }
        })
      );
  }
  private async updateAvatar(jobId: string, file: File) {
    console.log(jobId);
    const result = await this.storage.ref(`JobPosts/${jobId}`).put(file);
    const photoURL = await result.ref.getDownloadURL();
    this.db.doc(`JobPosts/${jobId}`).update({
      photoURL
    });
    console.log(photoURL);
  }
}

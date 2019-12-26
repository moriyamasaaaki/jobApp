import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DetailJob } from '../interfaces/article';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  createJobPost(article: DetailJob) {
    const id = this.db.createId();
    return this.db
      .doc(`JobPosts/${id}`)
      .set(article)
      .then(() => {
        this.snackBar.open('求人を作成しました', null, {
          duration: 2000
        });
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
}

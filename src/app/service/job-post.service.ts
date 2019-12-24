import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DamiJob } from '../interfaces/article';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {
  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

  createJobPost(article: DamiJob) {
    const id = this.db.createId();
    return this.db
      .doc(`JobPosts/${id}`)
      .set(article)
      .then(() => {
        this.snackBar.open('求人を作成しました', null, {
          duration: 2000
        });
      });
  }
}

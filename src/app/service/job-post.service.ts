import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DetailJob } from '../interfaces/article';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { async } from '@angular/core/testing';

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

  uploadImage(file: File, id: string): Promise<void> {
    return this.storage.upload(`jobPosts/${id}`, file).then(result => {
      this.db.doc(`JobPosts/${id}`).update({
        photoURL: result.ref.getDownloadURL()
      });
    });
  }

  uploadImages(files: File[], id: string): Promise<void> {
    console.log(files);
    console.log(id);
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
      console.log(jobImageUrls);
      return this.db.doc(`JobPosts/${id}`).update({
        jobImageUrls
      });
    });
  }

  createJobPost(article: DetailJob, images?: File[]) {
    console.log(article);
    console.log(images);
    const id = this.db.createId();
    return this.db
      .doc(`JobPosts/${id}`)
      .set({ id, ...article })
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
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserProfile } from '../interfaces/profile';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  createUser(profile: UserProfile, avatarImage?: File) {
    return this.db
      .doc(`userProfile/${profile.userId}`)
      .set(profile)
      .then(() => {
        this.snackBar.open('userを作成しました。', null, {
          duration: 2000
        });
        if (avatarImage) {
          this.updateAvatar(profile.userId, avatarImage);
        }
        this.router.navigateByUrl('/mypage');
      });
  }
  getUser(userId: string): Observable<UserProfile> {
    return this.db
      .collection<UserProfile>('userProfile', ref =>
        ref.where('userId', '==', userId)
      )
      .valueChanges()
      .pipe(
        map(userProfile => {
          if (userProfile.length) {
            return userProfile[0];
          } else {
            return null;
          }
        })
      );
  }
  private async updateAvatar(userId: string, file: File) {
    console.log(userId);
    const result = await this.storage.ref(`userProfile/${userId}`).put(file);
    const photoURL = await result.ref.getDownloadURL();
    this.db.doc(`userProfile/${userId}`).update({
      photoURL
    });
    console.log(photoURL);
  }
}

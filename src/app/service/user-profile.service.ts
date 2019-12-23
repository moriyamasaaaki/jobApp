import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserProfile } from '../interfaces/profile';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

  createUser(profile: UserProfile) {
    const id = this.db.createId();
    return this.db
      .doc(`userProfile/${id}`)
      .set(profile)
      .then(() => {
        this.snackBar.open('userを作成しました。', null, {
          duration: 2000
        });
      });
  }
}

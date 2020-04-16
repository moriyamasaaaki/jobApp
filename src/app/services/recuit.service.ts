import { Injectable } from '@angular/core';
import { UserProfile } from '../interfaces/profile';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecuitService {
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  createRecuitForm(profile: Omit<UserProfile, 'userId'>): Promise<void> {
    const userId = this.authService.uid;
    return this.db
      .doc(`userProfile/${userId}`)
      .set({ userId, ...profile })
      .then(() => {
        this.snackBar.open('応募フォームを送信しました', null, {
          duration: 3000
        });
      })
      .catch(error => {
        console.log(error);
        this.snackBar.open('応募フォームを送信できませんでした', null, {
          duration: 3000
        });
      });
  }
}

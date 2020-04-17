import { Injectable } from '@angular/core';
import { Recuit } from '../interfaces/profile';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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

  createRecuitForm(
    id: string,
    companyName: string,
    companyTitle: string,
    companyEmail: string,
    profile: Recuit
  ): Promise<void> {
    const userId = this.authService.uid;
    return this.db
      .doc(`JobPosts/${id}/recuit/${userId}`)
      .set({ userId, companyName, companyTitle, companyEmail, ...profile })
      .then(() => {
        this.router.navigateByUrl('/');
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

  getRecuitForm(id: string, userId: string): Observable<Recuit> {
    return this.db
      .doc<Recuit>(`JobPosts/${id}/recuit/${userId}`)
      .valueChanges();
  }
}

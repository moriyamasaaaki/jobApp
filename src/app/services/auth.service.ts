import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { Status } from '../interfaces/status';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  afUser$: Observable<User> = this.afAuth.user;
  uid: string;
  displayName: string;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar,
    private db: AngularFirestore
  ) {
    this.afUser$.subscribe(user => {
      this.uid = user && user.uid;
      this.displayName = user && user.displayName;
      console.log(this.uid);
    });
  }

  getUserLogin(uid: string): Observable<Status> {
    return this.db.doc<Status>(`users/${uid}`).valueChanges();
  }

  getCompanyLogin(uid: string): Observable<Status> {
    return this.db.doc<Status>(`companys/${uid}`).valueChanges();
  }

  userLogin() {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(result => {
        const userData = {
          uid: result.user.uid,
          status: 'user'
        };
        console.log(userData);
        this.db.doc(`users/${result.user.uid}`).set(userData);
        this.snackBar.open('ようこそTokyo biteへ!', null, {
          duration: 2000
        });
        this.router.navigateByUrl('/mypage');
      });
  }

  logout(uid: string) {
    this.afAuth.auth.signOut().then(() => {
      this.db.doc(`companys/${uid}`).delete();
      this.db.doc(`users/${uid}`).delete();
      this.snackBar.open('ログアウトしました。', null, {
        duration: 2000
      });
    });
    this.router.navigateByUrl('/');
  }

  companyLogin() {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(result => {
        const companyData = {
          uid: result.user.uid,
          status: 'company'
        };
        console.log(companyData);
        this.db.doc(`companys/${result.user.uid}`).set(companyData);
        this.snackBar.open('企業側としてログインしました。', null, {
          duration: 2000
        });
        this.router.navigateByUrl('/companyProfile');
      });
  }
}

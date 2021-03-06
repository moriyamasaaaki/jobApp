import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { Status } from '../interfaces/status';
import { error, log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  afUser$: Observable<User> = this.afAuth.user;
  uid: string;
  displayName: string;
  userLoginStatus: boolean;
  companyLoginStatus: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar,
    private db: AngularFirestore,
    private snackbar: MatSnackBar
  ) {
    this.afUser$.subscribe(user => {
      this.uid = user && user.uid;
      this.displayName = user && user.displayName;
    });
  }

  loginUser() {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(result => {
        const userData = {
          uid: result.user.uid,
          status: 'user'
        };
        this.db.doc(`users/${result.user.uid}`).set(userData);
        localStorage.setItem('Status', 'User');
        this.userLoginStatus = true;
        this.snackBar.open('ようこそTokyo biteへ!', null, {
          duration: 2000
        });
        this.router.navigateByUrl('/user/mypage');
      })
      .catch(error => {
        this.snackBar.open(`${error},ログインに失敗しました。`, null, {
          duration: 2000
        });
      });
  }

  logout(uid: string) {
    this.afAuth.auth
      .signOut()
      .then(() => {
        this.db.doc(`companys/${uid}`).delete();
        this.db.doc(`users/${uid}`).delete();
        this.snackBar.open('ログアウトしました。', null, {
          duration: 2000
        });
        this.router.navigateByUrl('/');
      })
      .catch(error => {
        this.snackBar.open(`${error},ログアウトできませんでした。`, null, {
          duration: 2000
        });
      });
  }

  loginCompany() {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(result => {
        const companyData = {
          uid: result.user.uid,
          status: 'company'
        };
        this.db.doc(`companys/${result.user.uid}`).set(companyData),
          this.db.doc(`customers/${result.user.uid}`).set({
            userId: '',
            email: '',
            customerId: '',
            subscriptionId: ''
          }),
          localStorage.setItem('Status', 'Company');
        this.companyLoginStatus = true;
        this.snackBar.open('企業側としてログインしました。', null, {
          duration: 2000
        });
        this.router.navigateByUrl('/company/profile');
      })
      .catch(error => {
        this.snackBar.open(`${error},ログインに失敗しました。`, null, {
          duration: 2000
        });
      });
  }

  getLoginUser(uid: string): Observable<Status> {
    return this.db.doc<Status>(`users/${uid}`).valueChanges();
  }

  getLoginCompany(uid: string): Observable<Status> {
    return this.db.doc<Status>(`companys/${uid}`).valueChanges();
  }

  withdrawUser() {
    return this.afAuth.auth.currentUser
      .delete()
      .then(() => {
        localStorage.removeItem('Status');
        this.userLoginStatus = false;
        this.companyLoginStatus = false;
        this.router.navigateByUrl('/');
        this.snackbar.open('ご利用ありがとうございました。', null, {
          duration: 3000
        });
      })
      .catch(error => {
        this.snackbar.open(
          '退会処理に失敗しました。もう一度行なって下さい。',
          null,
          {
            duration: 3000
          }
        );
        console.log(error);
      });
  }
}

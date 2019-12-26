import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CompanyProfile } from '../interfaces/profile';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyProfileService {
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  createCompanyUser(profile: CompanyProfile) {
    const id = this.db.createId();
    return this.db
      .doc(`companyProfile/${id}`)
      .set(profile)
      .then(() => {
        this.snackBar.open('企業側にプロフィールを登録しました。', null, {
          duration: 2000
        });
        this.router.navigateByUrl('/companyProfile');
      });
  }
  getCompanyUser(companyUserId: string): Observable<CompanyProfile> {
    return this.db
      .collection<CompanyProfile>('companyProfile', ref =>
        ref.where('companyUserId', '==', companyUserId)
      )
      .valueChanges()
      .pipe(
        map(companyProfile => {
          if (companyProfile) {
            return companyProfile[0];
          } else {
            return null;
          }
        })
      );
  }
}

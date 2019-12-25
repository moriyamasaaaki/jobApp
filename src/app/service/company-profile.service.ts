import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CompanyProfile } from '../interfaces/profile';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CompanyProfileService {
  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

  createCompanyUser(profile: CompanyProfile) {
    const id = this.db.createId();
    return this.db
      .doc(`companyProfile/${id}`)
      .set(profile)
      .then(() => {
        this.snackBar.open('企業側にプロフィールを登録しました。', null, {
          duration: 2000
        });
      });
  }
}
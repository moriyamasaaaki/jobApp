import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProfileComponent } from '../create-user-profile/profile/profile.component';

@Injectable({
  providedIn: 'root'
})
export class FormGuard implements CanDeactivate<ProfileComponent> {
  canDeactivate(component: ProfileComponent): Observable<boolean> | boolean {
    if (component.form.pristine || component.form.valid) {
      return true;
    }

    const confirmation = window.confirm(
      '作業中の内容が失われますがよろしいですか？'
    );
    return of(confirmation);
  }
}

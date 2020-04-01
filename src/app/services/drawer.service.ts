import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  //追記
  isOpenSource = new ReplaySubject(1);
  // isOpen$: ReplaySubject<boolean(1)>;
  //  = this.isOpenSource.asObservable();

  constructor() {
    this.isOpenSource.asObservable();
  }

  open() {
    this.isOpenSource.next(true);
  }

  close() {
    this.isOpenSource.next(false);
  }
}

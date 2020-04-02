import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  isOpenSource = new ReplaySubject<boolean>(1);
  isOpen$: Observable<boolean> = this.isOpenSource.asObservable();

  constructor() {}

  open() {
    this.isOpenSource.next(true);
  }

  close() {
    this.isOpenSource.next(false);
  }
}

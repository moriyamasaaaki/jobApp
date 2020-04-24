import { Injectable } from '@angular/core';
import { DrawerService } from './drawer.service';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  sidenavMode: string;

  constructor(private drawerService: DrawerService) {}

  handleResizeWindow(width: number) {
    if (1023 < width) {
      this.drawerService.open();
    } else {
      this.drawerService.close();
    }
  }
}

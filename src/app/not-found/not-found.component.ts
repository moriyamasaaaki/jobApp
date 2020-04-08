import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  constructor(private drawerService: DrawerService) {}

  ngOnInit() {
    this.handleResizeWindow(window.innerWidth);
  }
  handleResizeWindow(width: number) {
    if (1023 < width) {
      this.drawerService.open();
    } else {
      this.drawerService.close();
    }
  }
}

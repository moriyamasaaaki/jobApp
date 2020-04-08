import { Component, OnInit } from '@angular/core';
import { DrawerService } from 'src/app/services/drawer.service';

@Component({
  selector: 'app-comlaw',
  templateUrl: './comlaw.component.html',
  styleUrls: ['./comlaw.component.scss']
})
export class ComlawComponent implements OnInit {
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

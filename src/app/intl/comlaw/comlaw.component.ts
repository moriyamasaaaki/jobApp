import { Component, OnInit } from '@angular/core';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-comlaw',
  templateUrl: './comlaw.component.html',
  styleUrls: ['./comlaw.component.scss']
})
export class ComlawComponent implements OnInit {
  constructor(private windowService: WindowService) {}

  ngOnInit() {
    this.windowService.handleResizeWindow(window.innerWidth);
  }
}

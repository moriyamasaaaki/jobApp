import { Component, OnInit } from '@angular/core';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  constructor(private windowService: WindowService) {}

  ngOnInit() {
    this.windowService.handleResizeWindow(window.innerWidth);
  }
}

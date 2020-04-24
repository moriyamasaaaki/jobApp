import { Component, OnInit } from '@angular/core';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
  constructor(private windowService: WindowService) {}

  ngOnInit() {
    this.windowService.handleResizeWindow(window.innerWidth);
  }
}

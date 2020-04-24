import { Component, OnInit } from '@angular/core';
import { WindowService } from '../services/window.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  constructor(private windowService: WindowService) {}

  ngOnInit() {
    this.windowService.handleResizeWindow(window.innerWidth);
  }
}

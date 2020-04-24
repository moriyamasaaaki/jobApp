import { Component, OnInit } from '@angular/core';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  constructor(private windowService: WindowService) {}

  ngOnInit() {
    this.windowService.handleResizeWindow(window.innerWidth);
  }
}

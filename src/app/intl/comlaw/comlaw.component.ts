import { Component, OnInit } from '@angular/core';
import { DrawerService } from 'src/app/services/drawer.service';

@Component({
  selector: 'app-comlaw',
  templateUrl: './comlaw.component.html',
  styleUrls: ['./comlaw.component.scss']
})
export class ComlawComponent implements OnInit {
  constructor(private drawerService: DrawerService) {
    this.drawerService.open();
  }

  ngOnInit() {}
}

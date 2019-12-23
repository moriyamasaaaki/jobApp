import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  openDeleteDialog() {
    this.dialog.open(DeleteDialogComponent);
  }

  ngOnInit() {}
}

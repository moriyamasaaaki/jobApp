import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {
  name: string;

  constructor(
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
    }
  ) {
    this.name = this.authService.displayName;
  }

  ngOnInit() {}
}

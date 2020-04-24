import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {
  name: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
      btnText: string;
    }
  ) {
    const url = this.router.url;
    if (url === '/user/profile/create' || url === '/company/profile/create') {
      this.name = this.authService.displayName;
    } else {
      return;
    }
  }

  ngOnInit() {}
}

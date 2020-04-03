import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {
  userLoginStatus: boolean;
  companyLoginStatus: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  loginUser() {
    this.authService.loginUser();
  }

  loginCompany() {
    this.authService.loginCompany();
  }
}

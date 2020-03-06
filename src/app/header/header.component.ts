import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Status } from '../interfaces/status';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  uid: string;
  userLoginStatus: boolean;
  companyLoginStatus: boolean;
  user$ = this.authService.afUser$;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loginUserToggle();
    this.loginCompanyToggle();
  }

  loginUserToggle() {
    if (this.authService.getLoginUser(this.authService.uid)) {
      this.userLoginStatus = true;
      this.companyLoginStatus = false;
    } else if (!this.authService.getLoginUser(this.authService.uid)) {
      this.userLoginStatus = false;
      this.companyLoginStatus = true;
    }
  }
  loginCompanyToggle() {
    if (this.authService.getLoginCompany(this.authService.uid)) {
      this.companyLoginStatus = true;
      this.userLoginStatus = false;
    } else if (!this.authService.getLoginCompany(this.authService.uid)) {
      this.companyLoginStatus = false;
      this.userLoginStatus = true;
    }
  }

  loginUser() {
    this.authService.loginUser();
    this.authService.getLoginUser(this.authService.uid);
    this.userLoginStatus = true;
    this.companyLoginStatus = false;
  }

  loginCompany() {
    this.authService.loginCompany();
    this.authService.getLoginCompany(this.authService.uid);
    this.companyLoginStatus = true;
    this.userLoginStatus = false;
  }

  logout() {
    this.authService.logout(this.authService.uid);
    this.userLoginStatus = false;
    this.companyLoginStatus = false;
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Status } from '../interfaces/status';
import { searchClient } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

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
  display: boolean;

  inputParams = {
    hitsPerPage: 10,
    query: ''
  };
  config = {
    indexName: 'JobPosts',
    searchClient
  };

  search(workPlace: string) {
    this.router.navigate(['/search'], {
      queryParams: {
        workPlace
      }
    });
    this.display = false;
  }
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParamMap.subscribe(map => {
      this.inputParams.query = map.get('q');
    });
  }

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

  searchIcon() {
    return this.router.url !== '/';
  }

  searchNone() {
    return this.router.url === '/';
  }

  isSearch() {
    this.display = true;
  }
  notSearch() {
    this.display = false;
  }
}

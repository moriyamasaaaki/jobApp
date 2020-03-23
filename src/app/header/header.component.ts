import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
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
    this.loginToggle();
  }

  loginToggle() {
    const status = localStorage.getItem('Status');
    if (status === 'User') {
      this.userLoginStatus = true;
    } else if (status === 'Company') {
      this.companyLoginStatus = true;
    }
  }

  loginUser() {
    this.authService.loginUser();
    localStorage.setItem('Status', 'User');
    this.userLoginStatus = true;
  }

  loginCompany() {
    this.authService.loginCompany();
    localStorage.setItem('Status', 'Company');
    this.companyLoginStatus = true;
  }

  logout() {
    this.authService.logout(this.authService.uid);
    localStorage.removeItem('Status');
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

import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  DoCheck
} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { searchClient } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  uid: string;
  userLoginStatus: boolean;
  companyLoginStatus: boolean;
  user$ = this.authService.afUser$;
  display: boolean;

  @Output() addOops: EventEmitter<string> = new EventEmitter();

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
    private router: Router,
    private dialog: MatDialog
  ) {
    this.route.queryParamMap.subscribe(map => {
      this.inputParams.query = map.get('q');
    });
  }

  ngOnInit() {
    this.loginToggle();
  }

  ngDoCheck() {
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

  authDialog() {
    this.dialog.open(AuthDialogComponent, {
      autoFocus: false
    });
  }
}

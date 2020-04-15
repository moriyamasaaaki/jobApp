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
import { MatDialog, MatSnackBar } from '@angular/material';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { JobPostService } from '../services/job-post.service';
import { FeeService } from '../services/fee.service';
import { take } from 'rxjs/operators';

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
    private dialog: MatDialog,
    private jobPostService: JobPostService,
    private snackbar: MatSnackBar,
    private feeService: FeeService
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

  navigateEditor() {
    this.jobPostService
      .getMyCompanyJobs(this.authService.uid)
      .pipe(take(1))
      .subscribe(jobs => {
        const jobLength = jobs.length;
        this.feeService.getCustomer().subscribe((customer: any) => {
          const planCompany = customer.subscriptionId;
          if (
            (jobLength > 1 && customer === undefined) ||
            customer.subscriptionId === null
          ) {
            this.snackbar.open(
              '求人掲載を１つ以上掲載する場合はプレミアムプランへの登録が必要です。',
              null,
              {
                duration: 3000,
                verticalPosition: 'top'
              }
            );
          } else if (jobLength < 1 || planCompany) {
            this.router.navigateByUrl('/company/recruitment');
          }
        });
      });
  }

  loginToggle() {
    const status = localStorage.getItem('Status');
    if (status === 'User') {
      this.userLoginStatus = true;
    } else if (status === 'Company') {
      this.companyLoginStatus = true;
    } else {
      this.userLoginStatus = false;
      this.companyLoginStatus = false;
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

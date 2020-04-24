import { Component, OnInit } from '@angular/core';
import { CompanyProfileService } from 'src/app/services/company-profile.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { CompanyProfile } from 'src/app/interfaces/profile';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  profile$: Observable<
    CompanyProfile
  > = this.companyProfileSurvice.getCompanyUser(this.authService.uid);
  constructor(
    private companyProfileSurvice: CompanyProfileService,
    private authService: AuthService,
    private windowService: WindowService
  ) {}

  ngOnInit() {
    this.windowService.handleResizeWindow(window.innerWidth);
  }
}

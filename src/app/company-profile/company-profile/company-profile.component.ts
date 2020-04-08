import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { CompanyProfileService } from 'src/app/services/company-profile.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { CompanyProfile } from 'src/app/interfaces/profile';
import { DrawerService } from 'src/app/services/drawer.service';

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
    private dialog: MatDialog,
    private companyProfileSurvice: CompanyProfileService,
    private authService: AuthService,
    private drawerService: DrawerService
  ) {}

  openDeleteDialog() {
    this.dialog
      .open(DeleteDialogComponent)
      .afterClosed()
      .subscribe(status => {
        if (status) {
          this.companyProfileSurvice.deleteCompanyUser(this.authService.uid);
        }
      });
  }

  ngOnInit() {
    this.handleResizeWindow(window.innerWidth);
  }
  handleResizeWindow(width: number) {
    if (1023 < width) {
      this.drawerService.open();
    } else {
      this.drawerService.close();
    }
  }
}

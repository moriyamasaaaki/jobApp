import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/interfaces/profile';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {
  profile$: Observable<UserProfile> = this.userProfileService.getProfile(
    this.authService.uid
  );

  constructor(
    private dialog: MatDialog,
    private userProfileService: UserProfileService,
    private authService: AuthService,
    private windowService: WindowService
  ) {}

  openDeleteDialog() {
    this.dialog
      .open(DeleteDialogComponent)
      .afterClosed()
      .subscribe(status => {
        if (status) {
          console.log(this.authService.uid);
          this.userProfileService.deleteProfile(this.authService.uid);
        }
      });
  }

  ngOnInit() {
    this.windowService.handleResizeWindow(window.innerWidth);
  }
}

import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/interfaces/profile';
import { WindowService } from 'src/app/services/window.service';
import { ProfileDialogComponent } from 'src/app/profile-dialog/profile-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    private userProfileService: UserProfileService,
    private authService: AuthService,
    private windowService: WindowService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.windowService.handleResizeWindow(window.innerWidth);
  }

  openDeleteDialog() {
    this.dialog
      .open(ProfileDialogComponent, {
        data: {
          title: '退会しますか？？',
          content:
            '退会すると全てのデータが削除され、復元することはできません。',
          btnText: '退会する'
        }
      })
      .afterClosed()
      .subscribe(status => {
        if (status) {
          this.authService.withdrawUser();
        }
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { UserProfileService } from 'src/app/service/user-profile.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/interfaces/profile';

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
    private authService: AuthService
  ) {}

  openDeleteDialog() {
    this.dialog.open(DeleteDialogComponent);
  }

  ngOnInit() {}
}

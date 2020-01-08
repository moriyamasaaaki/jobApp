import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../service/user-profile.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  userId: string;
  constructor(
    private userProfileService: UserProfileService,
    private authService: AuthService
  ) {}

  ngOnInit() {}
}

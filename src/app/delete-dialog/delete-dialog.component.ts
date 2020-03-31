import { Component, OnInit, Inject } from '@angular/core';
import { UserProfileService } from '../services/user-profile.service';
import { AuthService } from '../services/auth.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  userId: string;
  constructor(
    private userProfileService: UserProfileService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
    }
  ) {}

  ngOnInit() {}
}

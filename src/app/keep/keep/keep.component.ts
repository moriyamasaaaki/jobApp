import { Component, OnInit } from '@angular/core';
import { DetailJob } from 'src/app/interfaces/article';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LikedService } from 'src/app/services/liked.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WindowService } from 'src/app/services/window.service';
import { ProfileDialogComponent } from 'src/app/profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-keep',
  templateUrl: './keep.component.html',
  styleUrls: ['./keep.component.scss']
})
export class KeepComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private likedService: LikedService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private windowService: WindowService
  ) {}

  jobs$: Observable<DetailJob[]> = this.likedService.getLikedJobs(
    this.authService.uid
  );

  openDeleteDialog(job: DetailJob) {
    this.dialog
      .open(ProfileDialogComponent, {
        data: {
          title: `${job.title}をお気に入りから削除しますか？`,
          content: '削除すると復元することはできません。',
          btnText: '削除する'
        }
      })
      .afterClosed()
      .subscribe(status => {
        if (status) {
          const joblikeId = job.id;
          this.likedService.deleteLiked(this.authService.uid, joblikeId);
          this.snackBar.open(
            '選択した求人をお気に入りから削除しました。',
            null,
            {
              duration: 2000
            }
          );
        }
      });
  }

  ngOnInit() {
    this.windowService.handleResizeWindow(window.innerWidth);
  }
}

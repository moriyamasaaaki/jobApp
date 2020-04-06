import { Component, OnInit } from '@angular/core';
import { DetailJob } from 'src/app/interfaces/article';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LikedService } from 'src/app/services/liked.service';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DrawerService } from 'src/app/services/drawer.service';

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
    private drawerService: DrawerService
  ) {}

  jobs$: Observable<DetailJob[]> = this.likedService.getLikedJobs(
    this.authService.uid
  );

  openDeleteDialog(job: DetailJob) {
    this.dialog
      .open(DeleteDialogComponent)
      .afterClosed()
      .subscribe(status => {
        if (status) {
          const joblikeId = job.id;
          this.likedService.deleteLiked(this.authService.uid, joblikeId);
        }
        this.snackBar.open('選択した求人をお気に入りから削除しました。', null, {
          duration: 2000
        });
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

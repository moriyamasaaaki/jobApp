import { Component, OnInit, Input } from '@angular/core';
import { DetailJob } from 'src/app/interfaces/article';
import { JobPostService } from 'src/app/service/job-post.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  constructor(
    private jobPostService: JobPostService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    route.paramMap.subscribe(params => {
      this.jobs$ = this.jobPostService.getJobPost(params.get('id'));
    });
  }
  job: DetailJob;
  id: string;
  jobs$: Observable<DetailJob>;
  likedCount: number;
  like: boolean;

  ngOnInit() {
    this.likedCount = 0;
  }

  openDeleteDialog() {
    this.dialog
      .open(DeleteDialogComponent)
      .afterClosed()
      .subscribe(status => {
        if (status) {
          this.route.paramMap.subscribe(params => {
            this.jobPostService.deleteJob(params.get('id'));
          });
        }
      });
  }

  toggleLiked(job: DetailJob) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.authService.uid && !this.like) {
        this.jobPostService.likedItem(this.id, this.authService.uid);
        this.jobPostService.likedUser(this.id, this.authService.uid);
        this.likedCount++;
        this.like = true;
        this.snackBar.open('お気に入り追加しました。', null, {
          duration: 3000
        });
      } else {
        this.jobPostService.deleteLikedJobs(this.authService.uid, this.id);
        this.jobPostService.deleteLikesUser(this.id, this.authService.uid);
        this.likedCount--;
        this.like = false;
        this.snackBar.open('お気に入り削除しました。', null, {
          duration: 3000
        });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { DetailJob } from 'src/app/interfaces/article';
import { JobPostService } from 'src/app/services/job-post.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LikedService } from 'src/app/services/liked.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  job: DetailJob;
  id: string;
  jobs$: Observable<DetailJob>;
  likedCount: number;
  like: boolean;
  likeid: string;

  constructor(
    private jobPostService: JobPostService,
    private likedService: LikedService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    route.paramMap.subscribe(params => {
      this.jobs$ = this.jobPostService.getJobPost(params.get('id'));
    });
  }

  ngOnInit() {
    this.getlikes();
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

  getlikes() {
    this.route.paramMap.subscribe(params => {
      this.jobPostService
        .getJobPost(params.get('id'))
        .pipe(take(1))
        .subscribe(result => {
          this.likedCount = result.likedCount;
          this.likeid = result.id;
          if (this.authService.uid) {
            this.likedService
              .isLiked(this.likeid, this.authService.uid)
              .pipe(take(1))
              .subscribe(likedJob => {
                this.like = likedJob;
              });
          }
        });
    });
  }

  toggleLiked() {
    this.route.paramMap.subscribe(params => {
      const authId = this.authService.uid;
      this.id = params.get('id');
      if (authId && !this.like) {
        this.likedService.likedItem(this.id, authId);
        this.likedService.likedUser(this.id, authId);
        this.likedCount++;
        this.like = true;
        this.snackBar.open('お気に入り追加しました。', null, {
          duration: 1000
        });
      } else if (authId && this.like) {
        this.likedService.deleteLikedJobs(authId, this.id);
        this.likedService.deleteLikesUser(this.id, authId);
        this.likedCount--;
        this.like = false;
        this.snackBar.open('お気に入り削除しました。', null, {
          duration: 1000
        });
      }
    });
  }
}

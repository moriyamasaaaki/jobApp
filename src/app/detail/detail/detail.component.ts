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

  ngOnInit() {
    // this.likedCount = this.job.likedCount;
    this.likedCount = 0;
  }

  openDeleteDialog() {
    this.dialog
      .open(DeleteDialogComponent)
      .afterClosed()
      .subscribe(status => {
        if (status) {
          this.route.paramMap.subscribe(params => {
            console.log(params);
            this.jobPostService.deleteJob(params.get('id'));
          });
        }
      });
  }

  addFavorite(job: DetailJob) {
    // this.likedCount = job.likedCount;
    this.route.paramMap.subscribe(params => {
      this.jobPostService.likedItem(params.get('id'), this.authService.uid),
        this.jobPostService.likedUser(params.get('id'), this.authService.uid);
    }),
      this.likedCount++;
    this.snackBar.open('お気に入り追加しました。', null, {
      duration: 3000
    });
  }

  deleteFavorite(job: DetailJob) {
    // this.likedCount = job.likedCount;
    this.route.paramMap.subscribe(params => {
      this.jobPostService.deleteLikedJobs(
        this.authService.uid,
        params.get('id')
      );
      this.jobPostService.deleteLikesUser(
        params.get('id'),
        this.authService.uid
      );
    });
    if (this.likedCount <= 0) {
      return 0;
    }
    this.likedCount--;
    console.log(this.likedCount);
    this.snackBar.open('お気に入り削除しました。', null, {
      duration: 3000
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { DetailJob } from 'src/app/interfaces/article';
import { JobPostService } from 'src/app/services/job-post.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LikedService } from 'src/app/services/liked.service';
import { take } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';
import { DrawerService } from 'src/app/services/drawer.service';

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
  jobId: string;
  jobEdit: boolean;

  constructor(
    private jobPostService: JobPostService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private likedService: LikedService,
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    private drawerService: DrawerService
  ) {
    this.drawerService.open();
    route.paramMap.subscribe(params => {
      this.jobs$ = this.jobPostService.getJobPost(params.get('id'));
    });
  }

  ngOnInit() {
    this.getlikes();
    this.editCompanyUser();
    this.getTitle();
  }

  getTitle() {
    this.route.paramMap.subscribe(params => {
      this.jobPostService.getJobPost(params.get('id')).subscribe(data => {
        this.titleService.setTitle(`求人詳細-${data.title}-`);
        if (data.companyContent) {
          this.metaService.updateTag({
            name: 'description',
            content: data.companyContent
          });
        } else {
          this.metaService.removeTag("name='description'");
        }
        if (data.title) {
          this.metaService.updateTag({
            property: 'og:title',
            content: data.title
          });
        } else {
          this.metaService.removeTag("property='og:title'");
        }
        if (data.companyContent) {
          this.metaService.updateTag({
            property: 'og:description',
            content: data.companyContent
          });
        } else {
          this.metaService.removeTag("property='og:description'");
        }

        if (data.jobImageUrls[0]) {
          this.metaService.updateTag({
            property: 'og:image',
            content: data.jobImageUrls[0]
          });
        } else {
          this.metaService.removeTag("property='og:image'");
        }
      });
    });
  }

  editCompanyUser() {
    this.route.paramMap.subscribe(params => {
      this.jobPostService.getJobPost(params.get('id')).subscribe(job => {
        this.jobId = job.jobId;
        if (this.jobId === this.authService.uid) {
          this.jobEdit = true;
        } else {
          this.jobEdit = false;
        }
      });
    });
  }

  openDeleteDialog() {
    this.route.paramMap.subscribe(params => {
      this.jobPostService.getJobPost(params.get('id')).subscribe(job => {
        this.dialog
          .open(DeleteDialogComponent, {
            data: {
              title: `${job.title}を削除しますか？？`,
              content: '削除すると復元することはできません。',
              btnText: '削除する'
            }
          })
          .afterClosed()
          .subscribe(status => {
            if (status) {
              this.route.paramMap.subscribe(params => {
                this.jobPostService.deleteJob(params.get('id'));
              });
              this.router.navigateByUrl('/');
            }
          });
      });
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
              .checkIsLiked(this.likeid, this.authService.uid)
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
        this.likedService.likedPost(this.id, authId);
        this.likedService.getLikedUser(this.id, authId);
        this.likedCount++;
        this.like = true;
        this.snackBar.open('お気に入り追加しました。', null, {
          duration: 1000
        });
      } else if (authId && this.like) {
        this.likedService.deleteLiked(authId, this.id);
        this.likedService.deleteLikedUser(this.id, authId);
        this.likedCount--;
        this.like = false;
        this.snackBar.open('お気に入り削除しました。', null, {
          duration: 1000
        });
      } else {
        this.snackBar.open('いいねできません。ログインして下さい。', null, {
          duration: 3000
        });
      }
    });
  }
}

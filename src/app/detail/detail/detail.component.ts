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
import { take, map } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';
import { DrawerService } from 'src/app/services/drawer.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { RecuitService } from 'src/app/services/recuit.service';
import { Recuit } from 'src/app/interfaces/profile';

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
  existRecuitForm: boolean;
  config: SwiperConfigInterface = {
    loop: true,
    navigation: true,
    pagination: true,
    centeredSlides: true,
    slidesPerView: 1,
    speed: 600
  };
  selectedJobId = 0;

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
    private drawerService: DrawerService,
    private userProfile: UserProfileService,
    private recuitService: RecuitService
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
    this.isRecuit();
    this.handleResizeWindow(window.innerWidth);
  }

  handleResizeWindow(width: number) {
    if (1023 < width) {
      this.drawerService.open();
    } else {
      this.drawerService.close();
    }
  }

  getTitle() {
    this.route.paramMap.subscribe(params => {
      this.jobPostService.getJobPost(params.get('id')).subscribe(data => {
        this.titleService.setTitle(`${data.title}-求人詳細-`);
        const meta = this.metaService;
        data.companyContent
          ? meta.updateTag({
              name: 'description',
              content: data.companyContent
            })
          : meta.removeTag("name='description'");

        data.title
          ? meta.updateTag({ property: 'og:title', content: data.title })
          : meta.removeTag("property='og:title'");

        data.companyContent
          ? meta.updateTag({
              property: 'og:description',
              content: data.companyContent
            })
          : meta.removeTag("property='og:description'");

        data.jobImageUrls[0]
          ? meta.updateTag({
              property: 'og:image',
              content: data.jobImageUrls[0]
            })
          : meta.removeTag("property='og:image'");
      });
    });
  }

  isRecuit() {
    this.route.paramMap.subscribe(params => {
      this.recuitService
        .getRecuitForm(params.get('id'), this.authService.uid)
        .subscribe(data => {
          if (data.userId === this.authService.uid) {
            this.existRecuitForm = true;
          } else if (
            data.userId !== this.authService.uid ||
            data.userId === undefined
          ) {
            this.existRecuitForm = false;
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
      this.userProfile.getProfile(this.authService.uid).subscribe(profile => {
        if (profile && authId && !this.like) {
          this.likedService.likedPost(this.id, authId);
          this.likedService.getLikedUser(this.id, authId);
          this.likedCount++;
          this.like = true;
          this.snackBar.open('お気に入り追加しました。', null, {
            duration: 1000
          });
        } else if (profile && authId && this.like) {
          this.likedService.deleteLiked(authId, this.id);
          this.likedService.deleteLikedUser(this.id, authId);
          this.likedCount--;
          this.like = false;
          this.snackBar.open('お気に入り削除しました。', null, {
            duration: 1000
          });
        } else if (!profile && authId) {
          this.snackBar.open(
            'いいねできません。ユーザープロフィールを作成してください。',
            null,
            {
              duration: 3000
            }
          );
        } else {
          this.snackBar.open('いいねできません。ログインして下さい。', null, {
            duration: 3000
          });
        }
      });
    });
  }
}

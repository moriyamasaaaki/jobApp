import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { JobPostService } from 'src/app/services/job-post.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DetailJob } from 'src/app/interfaces/article';
import { CompanyProfileService } from 'src/app/services/company-profile.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialogComponent } from 'src/app/profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})
export class RecruitmentComponent implements OnInit {
  jobs$: Observable<DetailJob>;
  id: string;
  imageURLs: string[];
  images: File[];
  editJob: boolean;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    url: ['', [Validators.required]],
    companyContent: ['', [Validators.required, Validators.maxLength(400)]],
    jobContent: ['', [Validators.required, Validators.maxLength(400)]],
    label: ['', []],
    companyName: ['', [Validators.required]],
    salary: ['', [Validators.required]],
    workPlace: ['', [Validators.required]]
  });

  get titleControl() {
    return this.form.get('title') as FormControl;
  }

  get urlControl() {
    return this.form.get('url') as FormControl;
  }

  get companyContentControl() {
    return this.form.get('companyContent') as FormControl;
  }

  get jobContentControl() {
    return this.form.get('jobContent') as FormControl;
  }

  get labelControl() {
    return this.form.get('label') as FormControl;
  }

  get companyNameControl() {
    return this.form.get('companyName') as FormControl;
  }

  get salaryControl() {
    return this.form.get('salary') as FormControl;
  }

  get workPlaceControl() {
    return this.form.get('workPlace') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private jobPostService: JobPostService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private companyProfileService: CompanyProfileService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      this.jobPostService.getJobPost(this.id).subscribe(article => {
        if (article) {
          this.editJob = true;
          this.form.patchValue(article);
          this.imageURLs = article.jobImageUrls;
        }
      });
    });
  }

  setImage(event) {
    if (event.target.files.length) {
      this.images = Object.values(event.target.files);
    }
  }

  create() {
    this.companyProfileService
      .getCompanyUser(this.authService.uid)
      .subscribe(profile => {
        if (profile) {
          this.jobPostService.createJobPost(
            this.authService.uid,
            profile.email,
            {
              createdAt: new Date(),
              updatedAt: new Date(),
              likedCount: 0,
              ...this.form.value
            },
            this.images
          );
        } else {
          this.dialog
            .open(ProfileDialogComponent, {
              data: {
                title: '⚠️求人を作成できません⚠️',
                content: '様はプロフィールを作成してから求人作成をして下さい。'
              }
            })
            .afterClosed();
        }
      });
  }

  update() {
    this.jobPostService.updateJob(
      {
        updatedAt: new Date(),
        ...this.form.value
      },
      this.id,
      this.images
    );
  }

  submit() {
    if (this.editJob) {
      this.update();
    } else {
      this.create();
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = '入力した内容がありますが、再読み込みしますか？';
    }
  }
}

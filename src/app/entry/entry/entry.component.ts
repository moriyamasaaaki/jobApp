import { Component, OnInit, HostListener } from '@angular/core';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { JobPostService } from 'src/app/services/job-post.service';
import { Observable } from 'rxjs';
import { DetailJob } from 'src/app/interfaces/article';
import { RecuitService } from 'src/app/services/recuit.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  years = new Array(61).fill(null);
  bottom = new Date().getFullYear() - 60;
  months = new Array(12).fill(null);
  days = new Array(31).fill(null);
  id: string;
  companyEmail: string;

  userId: string;
  jobs$: Observable<DetailJob>;

  form = this.fb.group({
    name: ['', [Validators.required]],
    bday: this.fb.group({
      year: ['', [Validators.required]],
      month: ['', [Validators.required]],
      day: ['', [Validators.required]]
    }),
    gender: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    tel: ['', [Validators.required, Validators.pattern(/^0\d{9,10}$/)]]
  });

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get yearControl() {
    return this.form.get('bday.year') as FormControl;
  }

  get monthControl() {
    return this.form.get('bday.month') as FormControl;
  }

  get dayControl() {
    return this.form.get('bday.day') as FormControl;
  }

  get genderControl() {
    return this.form.get('gender') as FormControl;
  }

  get emailControl() {
    return this.form.get('email') as FormControl;
  }

  get telControl() {
    return this.form.get('tel') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private userProfileService: UserProfileService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private jobPostService: JobPostService,
    private recuitService: RecuitService
  ) {
    route.paramMap.subscribe(params => {
      this.jobs$ = this.jobPostService.getJobPost(params.get('id'));
    });
  }

  ngOnInit() {
    this.userProfileService
      .getProfile(this.authService.uid)
      .subscribe(profile => {
        if (profile) {
          this.form.patchValue(profile);
        }
      });
  }

  submit() {
    this.route.paramMap.subscribe(params => {
      this.jobPostService.getJobPost(params.get('id')).subscribe(param => {
        this.id = param.id;
        const companyName = param.companyName;
        const companyTitle = param.title;
        const companyEmail = param.companyEmail;
        this.recuitService.createRecuitForm(
          this.id,
          companyName,
          companyTitle,
          companyEmail,
          {
            userId: this.authService.uid,
            ...this.form.value
          }
        );
      });
    });
  }
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = '入力した内容がありますが、再読み込みしますか？';
    }
  }
}

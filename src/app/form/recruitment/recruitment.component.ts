import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { JobPostService } from 'src/app/service/job-post.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})
export class RecruitmentComponent implements OnInit {
  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],

    workTime: [
      '',
      [
        Validators.required,
        Validators.pattern(/([0-1][0-9]|2[0-3]):[0-5][0-9]/)
      ]
    ],

    holiday: ['', [Validators.required]],

    welfare: ['', [Validators.required]],

    companyContent: ['', [Validators.required, Validators.maxLength(400)]],

    label: ['', []],

    companyName: ['', [Validators.required]],

    salary: ['', [Validators.required]],

    occupation: ['', [Validators.required]],

    workPlace: ['', [Validators.required]]
  });

  images: File[];

  get titleControl() {
    return this.form.get('title') as FormControl;
  }

  get workTimeControl() {
    return this.form.get('workTime') as FormControl;
  }

  get holidayControl() {
    return this.form.get('holiday') as FormControl;
  }

  get welfareControl() {
    return this.form.get('welfare') as FormControl;
  }

  get companyContentControl() {
    return this.form.get('companyContent') as FormControl;
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

  get occupationControl() {
    return this.form.get('occupation') as FormControl;
  }

  get workPlaceControl() {
    return this.form.get('workPlace') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private jobPostService: JobPostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.jobPostService.getJobPost(this.authService.uid).subscribe(article => {
      if (article) {
        this.form.patchValue(article);
      }
    });
  }

  setImage(event) {
    if (event.target.files.length) {
      this.images = Object.values(event.target.files);
    }
  }

  submit() {
    this.jobPostService.createJobPost(
      this.authService.uid,
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        likedCount: 0,
        ...this.form.value
      },
      this.images
    );
  }
}

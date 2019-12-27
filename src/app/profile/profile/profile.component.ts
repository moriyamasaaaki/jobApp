import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserProfileService } from 'src/app/service/user-profile.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/interfaces/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  years = new Array(61).fill(null);
  bottom = new Date().getFullYear() - 60;
  months = new Array(12).fill(null);
  days = new Array(31).fill(null);

  schools = ['中学', '高校', '専門', '大学', '大学院'];
  states = ['卒業', '在学中', '中退'];

  image: File;

  form = this.fb.group({
    name: ['', [Validators.required]],
    address: ['', [Validators.required]],
    bday: this.fb.group({
      year: ['', [Validators.required]],
      month: ['', [Validators.required]],
      day: ['', [Validators.required]]
    }),
    gender: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    tel: ['', [Validators.required, Validators.pattern(/^0\d{9,10}$/)]],
    school: ['', [Validators.required]],
    state: ['', [Validators.required]],
    possibleDay: ['', [Validators.required]],
    tagOne: ['', []],
    tagSecond: ['', []],
    introduce: ['', []],
    belongs: ['', [Validators.required]]
  });
  userId: string;

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get addressControl() {
    return this.form.get('address') as FormControl;
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

  get schoolControl() {
    return this.form.get('school') as FormControl;
  }

  get stateControl() {
    return this.form.get('state') as FormControl;
  }

  get possibleDayControl() {
    return this.form.get('possibleDay') as FormControl;
  }

  get tagOneControl() {
    return this.form.get('tagOne') as FormControl;
  }

  get tagSecondControl() {
    return this.form.get('tagSecond') as FormControl;
  }

  get introduceControl() {
    return this.form.get('introduce') as FormControl;
  }

  get belongsControl() {
    return this.form.get('belongs') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private userProfileService: UserProfileService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userProfileService.getUser(this.authService.uid).subscribe(profile => {
      if (profile) {
        this.form.patchValue(profile);
      }
    });
  }

  setAvatar(event) {
    if (event.target.files.length) {
      const image = event.target.files[0];
      this.image = image;
    }
  }
  submit() {
    console.log(this.form.value);
    this.userProfileService.createUser(
      {
        userId: this.authService.uid,
        ...this.form.value
      },
      this.image
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  years = [
    1960,
    1961,
    1962,
    1963,
    1964,
    1965
  ];

  months = new Array(13).fill(null);
  days = new Array(31).fill(null);


  schools = [
    '中学', '高校', '専門', '大学', '大学院'
  ];

  states = [
    '卒業', '在学中', '中退'
  ];


  form = this.fb.group({
    myName: ['', [
      Validators.required,
    ]],

    address: ['', [
      Validators.required,
    ]],

    year: ['', [
      Validators.required,
    ]],

    month: ['', [
      Validators.required,
    ]],

    day: ['', [
      Validators.required,
    ]],

    gender: ['', [
      Validators.required,
    ]],

    email: ['', [
      Validators.required,
      Validators.email,
    ]],

    telephone: ['', [
      Validators.required,
      Validators.pattern(/^0\d{9,10}$/),
    ]],

    school: ['', [
      Validators.required,
    ]],

    state: ['', [
      Validators.required,
    ]],

    possibleDay: ['', [
      Validators.required,
    ]],







  });

  get myNameControl() {
    return this.form.get('myName') as FormControl;
  }

  get addressControl() {
    return this.form.get('address') as FormControl;
  }

  get yearControl() {
    return this.form.get('year') as FormControl;
  }

  get monthControl() {
    return this.form.get('month') as FormControl;
  }

  get dayControl() {
    return this.form.get('day') as FormControl;
  }

  get genderControl() {
    return this.form.get('gender') as FormControl;
  }

  get emailControl() {
    return this.form.get('email') as FormControl;
  }

  get telephoneControl() {
    return this.form.get('telephone') as FormControl;
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

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  submit() {
    console.log(this.form.value);
  }


}

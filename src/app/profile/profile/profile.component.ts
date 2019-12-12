import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form = this.fb.group({
    myName: ['', [
      Validators.required,
    ]],

    address: ['', [
      Validators.required,
    ]],

  });

  get myNameControl() {
    return this.form.get('myName') as FormControl;
  }

  get addressControl() {
    return this.form.get('address') as FormControl;
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

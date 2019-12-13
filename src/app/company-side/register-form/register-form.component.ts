import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  form = this.fb.group({
    companyName: ['', [
      Validators.required,
    ]],

    lastName: ['', [
      Validators.required,
      Validators.maxLength(30)
    ]],

    firstName: ['', [
      Validators.required,
      Validators.maxLength(30)
    ]],

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    password: ['', [
      Validators.required,
      Validators.pattern(/^([a-zA-Z0-9]{8,})$/)
    ]],

    // terms: ['', [
    //   Validators.required,
    // ]],
  });

  hide = true;



    get companyNameControl() {
    return this.form.get('companyName') as FormControl;
  }

    get lastNameControl() {
    return this.form.get('lastName') as FormControl;
  }

    get firstNameControl() {
    return this.form.get('firstName') as FormControl;
  }

      get emailControl() {
    return this.form.get('email') as FormControl;
  }


    get passwordControl() {
    return this.form.get('password') as FormControl;
  }

  //   get termsControl() {
  //   return this.form.get('terms') as FormControl;
  // }





  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

    submit() {
    console.log(this.form.value);
}


}

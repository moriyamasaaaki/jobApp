import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CompanyProfileService } from 'src/app/service/company-profile.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required]],

    department: ['', []],

    lastName: ['', [Validators.required, Validators.maxLength(30)]],

    firstName: ['', [Validators.required, Validators.maxLength(30)]],

    email: ['', [Validators.required, Validators.email]],

    password: [
      '',
      [Validators.required, Validators.pattern(/^([a-zA-Z0-9]{8,})$/)]
    ]
  });

  hide = true;

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get departmentControl() {
    return this.form.get('department') as FormControl;
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

  constructor(
    private fb: FormBuilder,
    private companyProfileService: CompanyProfileService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }

  submit() {
    console.log(this.form.value);
    const userDate = this.form.value;
    this.companyProfileService.createCompanyUser({
      companyUserId: this.authService.uid,
      name: userDate.name,
      department: userDate.department,
      lastName: userDate.lastName,
      firstName: userDate.firstName,
      email: userDate.email,
      password: userDate.password
    });
  }
}

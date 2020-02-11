import { Component, OnInit, HostListener } from '@angular/core';
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
    tel: ['', [Validators.required, Validators.pattern(/^0\d{9,10}$/)]],
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

  get telControl() {
    return this.form.get('tel') as FormControl;
  }

  get passwordControl() {
    return this.form.get('password') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private companyProfileService: CompanyProfileService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.companyProfileService
      .getCompanyUser(this.authService.uid)
      .subscribe(profile => {
        if (profile) {
          this.form.patchValue(profile);
        }
      });
  }

  submit() {
    console.log(this.form.value);
    this.companyProfileService.createCompanyUser({
      companyUserId: this.authService.uid,
      ...this.form.value
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

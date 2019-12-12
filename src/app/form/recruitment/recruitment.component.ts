import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})
export class RecruitmentComponent implements OnInit {

  form = this.fb.group({
    introduce: ['', [
      Validators.required,
      Validators.maxLength(50)
    ]],

    workTime: ['', [
      Validators.required,
      Validators.pattern(/([0-1][0-9]|2[0-3]):[0-5][0-9]/)
    ]],

    holiday: ['', [
      Validators.required,
    ]],

    welfare: ['', [
      Validators.required,
    ]],

    overview: ['', [
      Validators.required,
    ]],

    company: ['', [
      Validators.required,
    ]],

    salary: ['', [
      Validators.required,
    ]],

    profession: ['', [
      Validators.required,
    ]],

    location: ['', [
      Validators.required,
    ]],



  });

  get introduceControl() {
    return this.form.get('introduce') as FormControl;
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

  get overviewControl() {
    return this.form.get('overview') as FormControl;
  }

  get companyControl() {
    return this.form.get('company') as FormControl;
  }

  get salaryControl() {
    return this.form.get('salary') as FormControl;
  }

  get professionControl() {
    return this.form.get('profession') as FormControl;
  }

  get locationControl() {
    return this.form.get('location') as FormControl;
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

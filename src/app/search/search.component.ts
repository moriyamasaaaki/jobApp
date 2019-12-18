import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

form = this.fb.group({
  keyword: ['', [
    Validators.required,
    Validators.maxLength(50)
  ]],

  place: ['', [
    Validators.required,
    Validators.maxLength(40)
  ]],
});


get keywordControl() {
  return this.form.get('keyword') as FormControl;
}

get placeControl() {
  return this.form.get('place') as FormControl;
}

  user$ = this.authService.afUser$;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  companyLogin() {
    this.authService.companyLogin();
  }


  submit() {
    console.log(this.form.value);
  }
}

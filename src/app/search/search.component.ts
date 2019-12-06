import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

form = this.fb.group({
  keyword: ['', [
    Validators.required,
    Validators.maxLength(60)
  ]],

  place: ['', [
    Validators.required,
    Validators.maxLength(40)
  ]],
});

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

}

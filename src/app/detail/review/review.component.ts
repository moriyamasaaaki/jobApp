import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  formatLabel(value: number) {
    if (value >= 10) {
      return Math.round(value / 10);
    }
    return value;
  }

  descriptionLabel(value: number) {
    if (value < 2) {
      return 'ある';
    }
    if (value === 2) {
      return '普通';
    }
    if (value > 2) {
      return 'ない';
    }
  }

  shiftLabel(value: number) {
    if (value === 2) {
      return '利く';
    }
    if (value === 1) {
      return '普通';
    }
    if (value < 1) {
      return '利かない';
    }
  }

  ageLabel(value: number) {
    return `${value}代`;
  }

  overtimeLabel(value: number) {
    if (value === 3) {
      return 'ある';
    }
    if (value === 2) {
      return '少し';
    }
    if (value === 1) {
      return '普通';
    }
    if (value === 0) {
      return 'ない';
    }
  }

  constructor() { }

  ngOnInit() {
  }

}




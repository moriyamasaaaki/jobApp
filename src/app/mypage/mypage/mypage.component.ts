import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {
  constructor() {}

  dialog() {
    return alert('削除しますか？');
  }

  ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  helps = [];

  constructor() {}

  ngOnInit() {
    this.helps = [
      {
        title: 'Proxy Worksとは何ですか？？',
        description: '代行サービスやレンタルサービスをまとめた求人サービスです'
      },
      {
        title: 'どうやって登録すればいいですか？？',
        description: 'ログインしてプロフィールを作成した段階でご登録となります'
      },
      {
        title: 'ユーザー側・企業側どちらにも登録できますか？？',
        description:
          '同じアカウントでのご登録はすることができません。違うアカウントでしたらご登録することは可能です'
      },
      {
        title: 'Googleログイン以外はできないですか？',
        description:
          '今現在はGoogleログインしか対応しておりませんが、ユーザーの増加、ご要望等が多数あれば状況によって随時追加する予定です。'
      }
    ];
  }
}

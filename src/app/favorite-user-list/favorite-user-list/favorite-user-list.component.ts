import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from 'src/app/interfaces/profile';
import { Observable } from 'rxjs';
import { LikedService } from 'src/app/services/liked.service';

@Component({
  selector: 'app-favorite-user-list',
  templateUrl: './favorite-user-list.component.html',
  styleUrls: ['./favorite-user-list.component.scss']
})
export class FavoriteUserListComponent implements OnInit {
  likeUsers$: Observable<UserProfile[]>;

  constructor(
    private route: ActivatedRoute,
    private likedService: LikedService
  ) {
    route.paramMap.subscribe(params => {
      this.likeUsers$ = this.likedService.getLikedUserList(params.get('id'));
    });
  }
  ngOnInit() {}
}
